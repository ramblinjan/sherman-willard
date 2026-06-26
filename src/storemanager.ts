import { TINT_DURATIONS, DAY_DURATION } from './constants';
import type { ZoneId } from './constants';
import { generateOrder } from './order';
import { Customer } from './customer';
import { OrderTicket, TICKET_STATUS } from './ticket';
import type { Player } from './player';
import { showPrompt, showCelebration } from './hud';
import { pickCustomer } from './dialogue';
import { currentLevel } from './level';
import type { Station } from './stations';

const MAX_QUEUE      = 6;
const SPAWN_INTERVAL = 8;

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

// StoreManager owns the store's model (queue, tickets, machines, score, day
// timer) and the simulation ticks. Interaction logic lives in the stations it
// delegates to — see stations.ts. Stations read/write this model through the
// public surface below.
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

  // Public model state that stations operate on.
  freePickupSlots: number[] = [0, 1, 2, 3, 4, 5];
  celebrationTimer = 0;
  readonly stations: Station[] = currentLevel().stations;

  private _ticketSeq  = 0;
  private _spawnTimer = 1.0;

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

    if (this.celebrationTimer > 0) {
      this.celebrationTimer -= dt;
      if (this.celebrationTimer <= 0) showCelebration(false);
    }

    this._updatePrompt(player);
    if (player2) this._updatePrompt(player2, false);
  }

  // ── Station dispatch ───────────────────────────────────────────────────────

  // The station whose footprint contains the player's tile, or null.
  stationAt(player: Player): Station | null {
    const col = Math.floor(player.x);
    const row = Math.floor(player.y);
    for (const s of this.stations) {
      const f = s.footprint;
      if (col >= f.col && col < f.col + f.w && row >= f.row && row < f.row + f.h) return s;
    }
    return null;
  }

  handleInteraction(player: Player): void {
    const station = this.stationAt(player);
    if (station) station.onInteract(this, player);
  }

  private _updatePrompt(player: Player, isPrimary = true): void {
    player.activeZone = null;
    const station = this.stationAt(player);
    const prompt  = station ? station.prompt(this, player) : null;
    if (station && prompt) {
      player.activeZone = station.zone;
      if (isPrimary) showPrompt(prompt.text, prompt.showKey ?? true);
    } else if (isPrimary) {
      showPrompt(null);
    }
  }

  // ── Public helpers used by stations ────────────────────────────────────────

  requestLine(ticket: OrderTicket): void {
    const c = ticket.customer;
    if (!c.lines?.length || !ticket.order) return;
    c.speech = { state: 'shown' };
  }

  addFlash(zone: ZoneId): void {
    this.flashZones = this.flashZones.filter(f => f.zone !== zone);
    this.flashZones.push({ zone, alpha: 0.55, timer: 0.5 });
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
    this.requestLine(ticket);
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

  // ── Private: flashes ─────────────────────────────────────────────────────

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
