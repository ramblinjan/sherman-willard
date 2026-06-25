import { ZONE, SHAKE_DURATIONS, TINT_DURATIONS, DAY_DURATION } from './constants';
import type { ZoneId } from './constants';
import type { BaseType } from './types';
import { getNearbyInteractZone } from './tilemap';
import { generateOrder } from './order';
import { Customer } from './customer';
import { OrderTicket, TICKET_STATUS } from './ticket';
import type { Player } from './player';
import { showPrompt, showCelebration } from './hud';
import { pickCustomer } from './dialogue';

const MAX_QUEUE      = 6;
const MAX_CARRY      = 3;
const SPAWN_INTERVAL = 8;
const CELEBRATION_TIME = 2.0;

const SHAKER_ZONES: ZoneId[] = [ZONE.SHAKER_A, ZONE.SHAKER_B, ZONE.SHAKER_C];

// ── Machine + effect state shapes ──────────────────────────────────────────
export type ShakerStatus = 'idle' | 'shaking' | 'ready';
export interface Shaker { ticketId: number | null; timer: number; status: ShakerStatus; }

export interface TintProcessing { ticketId: number; timer: number; total: number; }
export interface TintMachine {
  inputQueue:  number[];
  processing:  TintProcessing | null;
  outputQueue: number[];
  active:      boolean;
  bangTimer:   number;
}

export interface FlashZone { zone: ZoneId; alpha: number; timer: number; }

export class StoreManager {
  tickets  = new Map<number, OrderTicket>();
  queue:    number[] = [];
  atPickup: number[] = [];
  shakers:  Shaker[] = [
    { ticketId: null, timer: 0, status: 'idle' },
    { ticketId: null, timer: 0, status: 'idle' },
    { ticketId: null, timer: 0, status: 'idle' },
  ];
  tintMachine: TintMachine = {
    inputQueue:  [],
    processing:  null,
    outputQueue: [],
    active:      false,
    bangTimer:   0,
  };
  score       = 0;
  gallonsSold = 0;
  flashZones: FlashZone[] = [];
  dayTimer    = 0;
  dayOver     = false;

  private _ticketSeq        = 0;
  private _spawnTimer       = 1.0;
  private _celebrationTimer  = 0;
  private _freePickupSlots: number[] = [0, 1, 2, 3, 4, 5];

  // ── Main update ──────────────────────────────────────────────────────────

  update(dt: number, player: Player, player2: Player | null = null): void {
    if (!this.dayOver) {
      this.dayTimer += dt;
      if (this.dayTimer >= DAY_DURATION) this.dayOver = true;
    }

    this._updateFlashes(dt);
    this._tickShakers(dt);
    this._tickTintMachine(dt);
    if (!this.dayOver) this._tickSpawn(dt);

    if (this._celebrationTimer > 0) {
      this._celebrationTimer -= dt;
      if (this._celebrationTimer <= 0) showCelebration(false);
    }

    this._updatePrompt(player);
    if (player2) this._updatePrompt(player2, false);
  }

  // ── Interaction handler ──────────────────────────────────────────────────

  handleInteraction(player: Player): void {
    const zone = getNearbyInteractZone(player.x, player.y);
    if (!zone) return;

    if (zone === ZONE.REGISTER) {
      this._takeOrder(player);
      return;
    }

    const baseMap: Partial<Record<ZoneId, BaseType>> = {
      [ZONE.SHELF_WHITE]: 'WHITE',
      [ZONE.SHELF_GRAY]:  'GRAY',
      [ZONE.SHELF_DEEP]:  'DEEP',
    };
    const grabbed = baseMap[zone];
    if (grabbed != null) {
      this._grabBase(player, grabbed, zone);
      return;
    }

    if (zone === ZONE.TINT_INPUT) {
      this._loadTintInput(player);
      return;
    }

    if (zone === ZONE.TINT_MACHINE_BODY) {
      this._activateTinter();
      return;
    }

    if (zone === ZONE.TINT_OUTPUT) {
      this._grabTintOutput(player);
      return;
    }

    const shakerIdx = SHAKER_ZONES.indexOf(zone);
    if (shakerIdx !== -1) {
      this._interactShaker(player, shakerIdx);
      return;
    }

    if (zone === ZONE.PICKUP) {
      this._deliverPaint(player);
    }
  }

  // ── Private: order flow ──────────────────────────────────────────────────

  private _takeOrder(player: Player): void {
    if (this.queue.length === 0) return;
    if (this._freePickupSlots.length === 0) return;

    const ticketId = this.queue[0];
    const ticket   = this.tickets.get(ticketId);
    if (!ticket) return;
    const canCount = ticket.order.canCount;

    if (player.totalHeld + canCount > MAX_CARRY) return;

    this.queue.shift();
    ticket.status = TICKET_STATUS.BASE_GRABBED;

    for (let i = 0; i < canCount; i++) {
      player.cans.push({ ticketId, baseType: null });
    }

    const pickupSlot  = this._freePickupSlots.shift()!;
    ticket.pickupSlot = pickupSlot;
    this.atPickup.push(ticketId);
    ticket.customer.moveToPickup(pickupSlot);

    this.queue.forEach((id, i) => this.tickets.get(id)?.customer.advanceQueue(i));

    this._requestLine(ticket);
  }

  private _grabBase(player: Player, grabbed: BaseType, zone: ZoneId): void {
    const entry = player.cans.find(e => {
      const t = this.tickets.get(e.ticketId);
      return e.baseType === null && t && t.order.baseType === grabbed;
    });

    if (entry) {
      entry.baseType = grabbed;
    } else if (player.cans.some(e => e.baseType === null)) {
      this._addFlash(zone);
    }
  }

  private _loadTintInput(player: Player): void {
    const entryIdx = player.cans.findIndex(e => e.baseType !== null);
    if (entryIdx === -1) return;

    const [entry] = player.cans.splice(entryIdx, 1);
    const ticket  = this.tickets.get(entry.ticketId);
    if (ticket) {
      ticket.status = TICKET_STATUS.TINT_QUEUED;
      this.tintMachine.inputQueue.push(entry.ticketId);
    }
  }

  private _activateTinter(): void {
    const tm = this.tintMachine;
    if (tm.inputQueue.length > 0 || tm.processing) tm.active = true;
  }

  private _grabTintOutput(player: Player): void {
    const tm = this.tintMachine;
    if (tm.outputQueue.length === 0) return;
    if (player.totalHeld >= MAX_CARRY) return;

    const ticketId = tm.outputQueue.shift()!;
    const ticket   = this.tickets.get(ticketId);
    if (ticket) ticket.status = TICKET_STATUS.SEALED;
    player.sealedCans.push({ ticketId });
    tm.bangTimer = 0.6;
  }

  private _interactShaker(player: Player, idx: number): void {
    const shaker = this.shakers[idx];

    if (shaker.status === 'ready') {
      const ticket = this.tickets.get(shaker.ticketId!);
      if (ticket) {
        player.mixedCans.push({ ticketId: shaker.ticketId!, order: ticket.order });
        ticket.status = TICKET_STATUS.AT_PICKUP;
      }
      shaker.ticketId = null;
      shaker.timer    = 0;
      shaker.status   = 'idle';
      return;
    }

    if (shaker.status === 'idle' && player.sealedCans.length > 0) {
      const entry  = player.sealedCans.shift()!;
      const ticket = this.tickets.get(entry.ticketId);
      if (!ticket) return;

      shaker.ticketId = entry.ticketId;
      shaker.timer    = SHAKE_DURATIONS[ticket.order.baseType];
      shaker.status   = 'shaking';
      ticket.status   = TICKET_STATUS.SHAKING;
      ticket.shakerId = idx;
    }
  }

  private _deliverPaint(player: Player): void {
    const idx = player.mixedCans.findIndex(e => this.atPickup.includes(e.ticketId));
    if (idx === -1) return;

    const { ticketId } = player.mixedCans.splice(idx, 1)[0];
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return;

    ticket.cansDelivered++;

    if (ticket.isComplete) {
      this.score++;
      this.gallonsSold += ticket.order.canCount;
      this.atPickup = this.atPickup.filter(id => id !== ticketId);
      this._freePickupSlots.push(ticket.pickupSlot!);
      this._freePickupSlots.sort();

      ticket.status = TICKET_STATUS.DONE;
      this._requestLine(ticket);
      ticket.customer.leave();

      showCelebration(true);
      this._celebrationTimer = CELEBRATION_TIME;

      setTimeout(() => this.tickets.delete(ticketId), 4000);
    }
    // else: customer stays at pickup, ticket stays in atPickup until all cans delivered
  }

  // ── Private: spawning ────────────────────────────────────────────────────

  private _tickSpawn(dt: number): void {
    this._spawnTimer -= dt;
    if (this._spawnTimer > 0) return;
    this._spawnTimer = SPAWN_INTERVAL;

    if (this.queue.length >= MAX_QUEUE) return;

    const slot     = this.queue.length;
    const order    = generateOrder();
    const customer = new Customer();
    const id       = ++this._ticketSeq;
    const ticket   = new OrderTicket(id, customer, order);
    ticket.queueSlot = slot;

    customer.arrive(order, pickCustomer(), slot);
    this.tickets.set(id, ticket);
    this.queue.push(id);
    this._requestLine(ticket);
  }

  // ── Private: shakers ─────────────────────────────────────────────────────

  private _tickShakers(dt: number): void {
    for (const shaker of this.shakers) {
      if (shaker.status !== 'shaking') continue;
      shaker.timer = Math.max(0, shaker.timer - dt);
      if (shaker.timer === 0) {
        shaker.status = 'ready';
        const ticket = this.tickets.get(shaker.ticketId!);
        if (ticket) ticket.status = TICKET_STATUS.SHAKER_DONE;
      }
    }
  }

  // ── Private: tinting machine ─────────────────────────────────────────────

  private _tickTintMachine(dt: number): void {
    const tm = this.tintMachine;
    tm.bangTimer = Math.max(0, tm.bangTimer - dt);

    if (tm.processing) {
      tm.processing.timer -= dt;
      if (tm.processing.timer <= 0) {
        const ticket = this.tickets.get(tm.processing.ticketId);
        if (ticket) ticket.status = TICKET_STATUS.TINT_DONE;
        tm.outputQueue.push(tm.processing.ticketId);
        tm.processing = null;
      }
    }

    if (!tm.processing && tm.inputQueue.length > 0 && tm.active) {
      const ticketId = tm.inputQueue.shift()!;
      const ticket   = this.tickets.get(ticketId);
      if (ticket) {
        const dur  = TINT_DURATIONS[ticket.order.baseType];
        tm.processing = { ticketId, timer: dur, total: dur };
        ticket.status = TICKET_STATUS.TINTING;
      }
    }

    if (!tm.processing && tm.inputQueue.length === 0) tm.active = false;
  }

  // ── Private: prompts ─────────────────────────────────────────────────────

  private _updatePrompt(player: Player, isPrimary = true): void {
    player.activeZone = null;
    const zone = getNearbyInteractZone(player.x, player.y);
    if (!zone) { if (isPrimary) showPrompt(null); return; }

    const shakerIdx = SHAKER_ZONES.indexOf(zone);
    if (shakerIdx !== -1) {
      const shaker = this.shakers[shakerIdx];
      if (shaker.status === 'shaking') {
        if (isPrimary) showPrompt(`Shaking… ${Math.ceil(shaker.timer)}s`, false);
        player.activeZone = zone;
        return;
      }
      if (shaker.status === 'ready') {
        const ticket = this.tickets.get(shaker.ticketId!);
        const label  = ticket ? `Collect for ${ticket.order.customerName.split(' ').pop()}` : 'Collect Paint';
        if (isPrimary) showPrompt(label);
        player.activeZone = zone;
        return;
      }
      if (player.sealedCans.length > 0) {
        if (isPrimary) showPrompt('Load Shaker');
        player.activeZone = zone;
      } else {
        if (isPrimary) showPrompt(null);
      }
      return;
    }

    if (zone === ZONE.REGISTER) {
      if (this.queue.length === 0 || this._freePickupSlots.length === 0) {
        if (isPrimary) showPrompt(null); return;
      }
      const nextTicket = this.tickets.get(this.queue[0]);
      const canCount   = nextTicket?.order.canCount ?? 1;
      if (player.totalHeld + canCount > MAX_CARRY) {
        if (isPrimary) showPrompt(null); return;
      }
      if (isPrimary) showPrompt(canCount > 1 ? `Take Order (×${canCount})` : 'Take Order');
      player.activeZone = zone;
      return;
    }

    if (zone === ZONE.SHELF_WHITE || zone === ZONE.SHELF_GRAY || zone === ZONE.SHELF_DEEP) {
      const baseNeeded: BaseType = { SHELF_WHITE: 'WHITE', SHELF_GRAY: 'GRAY', SHELF_DEEP: 'DEEP' }[zone] as BaseType;
      const canGrab = player.cans.some(e => {
        const t = this.tickets.get(e.ticketId);
        return e.baseType === null && t && t.order.baseType === baseNeeded;
      });
      const labels = { SHELF_WHITE: 'Grab White Base', SHELF_GRAY: 'Grab Gray Base', SHELF_DEEP: 'Grab Deep Base' };
      if (canGrab) {
        if (isPrimary) showPrompt(labels[zone]);
        player.activeZone = zone;
      } else {
        if (isPrimary) showPrompt(null);
      }
      return;
    }

    if (zone === ZONE.TINT_INPUT) {
      if (player.cans.some(e => e.baseType !== null)) {
        if (isPrimary) showPrompt('Load Tinter');
        player.activeZone = zone;
      } else {
        if (isPrimary) showPrompt(null);
      }
      return;
    }

    if (zone === ZONE.TINT_MACHINE_BODY) {
      const tm = this.tintMachine;
      if (tm.processing) {
        if (isPrimary) showPrompt(`Tinting… ${Math.ceil(tm.processing.timer)}s`, false);
        player.activeZone = zone;
        return;
      }
      if (tm.inputQueue.length > 0 && !tm.active) {
        if (isPrimary) showPrompt('Start Tinter');
        player.activeZone = zone;
      } else {
        if (isPrimary) showPrompt(null);
      }
      return;
    }

    if (zone === ZONE.TINT_OUTPUT) {
      if (this.tintMachine.outputQueue.length > 0) {
        if (isPrimary) showPrompt('Seal Can');
        player.activeZone = zone;
      } else {
        if (isPrimary) showPrompt(null);
      }
      return;
    }

    if (zone === ZONE.PICKUP) {
      const canDeliver = player.mixedCans.some(e => this.atPickup.includes(e.ticketId));
      if (canDeliver) {
        if (isPrimary) showPrompt('Hand Off Paint');
        player.activeZone = zone;
      } else {
        if (isPrimary) showPrompt(null);
      }
      return;
    }

    if (isPrimary) showPrompt(null);
  }

  // ── Private: dialogue ────────────────────────────────────────────────────

  private _requestLine(ticket: OrderTicket): void {
    const c = ticket.customer;
    if (!c.lines?.length || !ticket.order) return;
    c.speech = { state: 'shown' };
  }

  // ── Private: flashes ─────────────────────────────────────────────────────

  private _addFlash(zone: ZoneId): void {
    this.flashZones = this.flashZones.filter(f => f.zone !== zone);
    this.flashZones.push({ zone, alpha: 0.55, timer: 0.5 });
  }

  private _updateFlashes(dt: number): void {
    this.flashZones = this.flashZones
      .map(f => ({ ...f, timer: f.timer - dt, alpha: Math.max(0, (f.timer - dt) / 0.5 * 0.55) }))
      .filter(f => f.timer > 0);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  get allCustomers(): Customer[] {
    return [...this.tickets.values()].map(t => t.customer);
  }

  get queueTickets(): OrderTicket[] {
    return this.queue.map(id => this.tickets.get(id)!);
  }

  get pickupTickets(): OrderTicket[] {
    return this.atPickup.map(id => this.tickets.get(id)!);
  }
}
