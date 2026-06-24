import { ZONE, SHAKE_DURATIONS, TINT_DURATIONS, DAY_DURATION } from './constants.js';
import { getNearbyInteractZone } from './tilemap.js';
import { generateOrder } from './order.js';
import { Customer } from './customer.js';
import { OrderTicket, TICKET_STATUS } from './ticket.js';
import { showPrompt, showCelebration } from './hud.js';
import { pickPersona, generateLine } from './dialogue.js';

const MAX_QUEUE      = 6;
const MAX_CARRY      = 3;
const SPAWN_INTERVAL = 8;
const CELEBRATION_TIME = 2.0;

const SHAKER_ZONES = [ZONE.SHAKER_A, ZONE.SHAKER_B, ZONE.SHAKER_C];

export class StoreManager {
  constructor() {
    this.tickets  = new Map();
    this.queue    = [];
    this.atPickup = [];
    this.shakers  = [
      { ticketId: null, timer: 0, status: 'idle' },
      { ticketId: null, timer: 0, status: 'idle' },
      { ticketId: null, timer: 0, status: 'idle' },
    ];
    this.tintMachine = {
      inputQueue:  [],
      processing:  null,  // { ticketId, timer, total }
      outputQueue: [],
      active:      false,
      bangTimer:   0,
    };
    this.score        = 0;
    this.gallonsSold  = 0;
    this.flashZones   = [];
    this.dayTimer     = 0;
    this.dayOver      = false;

    this._ticketSeq        = 0;
    this._spawnTimer       = 1.0;
    this._celebrationTimer = 0;
    this._freePickupSlots  = [0, 1, 2, 3, 4, 5];
  }

  // ── Main update ──────────────────────────────────────────────────────────

  update(dt, player) {
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
  }

  // ── Interaction handler ──────────────────────────────────────────────────

  handleInteraction(player) {
    const zone = getNearbyInteractZone(player.x, player.y);
    if (!zone) return;

    if (zone === ZONE.REGISTER) {
      this._takeOrder(player);
      return;
    }

    const baseMap = {
      [ZONE.SHELF_WHITE]: 'WHITE',
      [ZONE.SHELF_GRAY]:  'GRAY',
      [ZONE.SHELF_DEEP]:  'DEEP',
    };
    if (baseMap[zone] != null) {
      this._grabBase(player, baseMap[zone], zone);
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

  _takeOrder(player) {
    if (this.queue.length === 0) return;
    if (this._freePickupSlots.length === 0) return;

    const ticketId = this.queue[0];
    const ticket   = this.tickets.get(ticketId);
    const canCount = ticket.order.canCount;

    if (player.totalHeld + canCount > MAX_CARRY) return;

    this.queue.shift();
    ticket.status = TICKET_STATUS.BASE_GRABBED;

    for (let i = 0; i < canCount; i++) {
      player.cans.push({ ticketId, baseType: null });
    }

    const pickupSlot  = this._freePickupSlots.shift();
    ticket.pickupSlot = pickupSlot;
    this.atPickup.push(ticketId);
    ticket.customer.moveToPickup(pickupSlot);

    this.queue.forEach((id, i) => this.tickets.get(id).customer.advanceQueue(i));

    this._requestLine(ticket, 'ORDER');
  }

  _grabBase(player, grabbed, zone) {
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

  _loadTintInput(player) {
    const entryIdx = player.cans.findIndex(e => e.baseType !== null);
    if (entryIdx === -1) return;

    const [entry] = player.cans.splice(entryIdx, 1);
    const ticket  = this.tickets.get(entry.ticketId);
    if (ticket) {
      ticket.status = TICKET_STATUS.TINT_QUEUED;
      this.tintMachine.inputQueue.push(entry.ticketId);
    }
  }

  _activateTinter() {
    const tm = this.tintMachine;
    if (tm.inputQueue.length > 0 || tm.processing) tm.active = true;
  }

  _grabTintOutput(player) {
    const tm = this.tintMachine;
    if (tm.outputQueue.length === 0) return;
    if (player.totalHeld >= MAX_CARRY) return;

    const ticketId = tm.outputQueue.shift();
    const ticket   = this.tickets.get(ticketId);
    if (ticket) ticket.status = TICKET_STATUS.SEALED;
    player.sealedCans.push({ ticketId });
    tm.bangTimer = 0.6;
  }

  _interactShaker(player, idx) {
    const shaker = this.shakers[idx];

    if (shaker.status === 'ready') {
      const ticket = this.tickets.get(shaker.ticketId);
      if (ticket) {
        player.mixedCans.push({ ticketId: shaker.ticketId, order: ticket.order });
        ticket.status = TICKET_STATUS.AT_PICKUP;
      }
      shaker.ticketId = null;
      shaker.timer    = 0;
      shaker.status   = 'idle';
      return;
    }

    if (shaker.status === 'idle' && player.sealedCans.length > 0) {
      const entry  = player.sealedCans.shift();
      const ticket = this.tickets.get(entry.ticketId);
      if (!ticket) return;

      shaker.ticketId = entry.ticketId;
      shaker.timer    = SHAKE_DURATIONS[ticket.order.baseType];
      shaker.status   = 'shaking';
      ticket.status   = TICKET_STATUS.SHAKING;
      ticket.shakerId = idx;
    }
  }

  _deliverPaint(player) {
    const idx = player.mixedCans.findIndex(e => this.atPickup.includes(e.ticketId));
    if (idx === -1) return;

    const { ticketId } = player.mixedCans.splice(idx, 1)[0];
    const ticket = this.tickets.get(ticketId);

    ticket.cansDelivered++;

    if (ticket.isComplete) {
      this.score++;
      this.gallonsSold += ticket.order.canCount;
      this.atPickup = this.atPickup.filter(id => id !== ticketId);
      this._freePickupSlots.push(ticket.pickupSlot);
      this._freePickupSlots.sort();

      ticket.status = TICKET_STATUS.DONE;
      this._requestLine(ticket, 'PICKUP');
      ticket.customer.leave();

      showCelebration(true);
      this._celebrationTimer = CELEBRATION_TIME;

      setTimeout(() => this.tickets.delete(ticketId), 4000);
    }
    // else: customer stays at pickup, ticket stays in atPickup until all cans delivered
  }

  // ── Private: spawning ────────────────────────────────────────────────────

  _tickSpawn(dt) {
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

    customer.arrive(order, pickPersona(), slot);
    this.tickets.set(id, ticket);
    this.queue.push(id);
  }

  // ── Private: shakers ─────────────────────────────────────────────────────

  _tickShakers(dt) {
    for (const shaker of this.shakers) {
      if (shaker.status !== 'shaking') continue;
      shaker.timer = Math.max(0, shaker.timer - dt);
      if (shaker.timer === 0) {
        shaker.status = 'ready';
        const ticket = this.tickets.get(shaker.ticketId);
        if (ticket) ticket.status = TICKET_STATUS.SHAKER_DONE;
      }
    }
  }

  // ── Private: tinting machine ─────────────────────────────────────────────

  _tickTintMachine(dt) {
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
      const ticketId = tm.inputQueue.shift();
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

  _updatePrompt(player) {
    const zone = getNearbyInteractZone(player.x, player.y);
    if (!zone) { showPrompt(null); return; }

    const shakerIdx = SHAKER_ZONES.indexOf(zone);
    if (shakerIdx !== -1) {
      const shaker = this.shakers[shakerIdx];
      if (shaker.status === 'shaking') {
        showPrompt(`Shaking… ${Math.ceil(shaker.timer)}s`, false);
        return;
      }
      if (shaker.status === 'ready') {
        const ticket = this.tickets.get(shaker.ticketId);
        const label  = ticket ? `Collect for ${ticket.order.customerName.split(' ').pop()}` : 'Collect Paint';
        showPrompt(label);
        return;
      }
      showPrompt(player.sealedCans.length > 0 ? 'Load Shaker' : null);
      return;
    }

    if (zone === ZONE.REGISTER) {
      if (this.queue.length === 0 || this._freePickupSlots.length === 0) {
        showPrompt(null); return;
      }
      const nextTicket = this.tickets.get(this.queue[0]);
      const canCount   = nextTicket?.order.canCount ?? 1;
      if (player.totalHeld + canCount > MAX_CARRY) {
        showPrompt(null); return;
      }
      showPrompt(canCount > 1 ? `Take Order (×${canCount})` : 'Take Order');
      return;
    }

    if (zone === ZONE.SHELF_WHITE || zone === ZONE.SHELF_GRAY || zone === ZONE.SHELF_DEEP) {
      const baseNeeded = { SHELF_WHITE: 'WHITE', SHELF_GRAY: 'GRAY', SHELF_DEEP: 'DEEP' }[zone];
      const canGrab = player.cans.some(e => {
        const t = this.tickets.get(e.ticketId);
        return e.baseType === null && t && t.order.baseType === baseNeeded;
      });
      const labels = { SHELF_WHITE: 'Grab White Base', SHELF_GRAY: 'Grab Gray Base', SHELF_DEEP: 'Grab Deep Base' };
      showPrompt(canGrab ? labels[zone] : null);
      return;
    }

    if (zone === ZONE.TINT_INPUT) {
      showPrompt(player.cans.some(e => e.baseType !== null) ? 'Load Tinter' : null);
      return;
    }

    if (zone === ZONE.TINT_MACHINE_BODY) {
      const tm = this.tintMachine;
      if (tm.processing) {
        showPrompt(`Tinting… ${Math.ceil(tm.processing.timer)}s`, false);
        return;
      }
      showPrompt(tm.inputQueue.length > 0 && !tm.active ? 'Start Tinter' : null);
      return;
    }

    if (zone === ZONE.TINT_OUTPUT) {
      showPrompt(this.tintMachine.outputQueue.length > 0 ? 'Seal Can' : null);
      return;
    }

    if (zone === ZONE.PICKUP) {
      const canDeliver = player.mixedCans.some(e => this.atPickup.includes(e.ticketId));
      showPrompt(canDeliver ? 'Hand Off Paint' : null);
      return;
    }

    showPrompt(null);
  }

  // ── Private: dialogue ────────────────────────────────────────────────────

  _requestLine(ticket, phase) {
    const c = ticket.customer;
    if (!c.persona || !ticket.order) return;
    c.speech = { text: generateLine(c.persona, phase, ticket.order), state: 'shown' };
  }

  // ── Private: flashes ─────────────────────────────────────────────────────

  _addFlash(zone) {
    this.flashZones = this.flashZones.filter(f => f.zone !== zone);
    this.flashZones.push({ zone, alpha: 0.55, timer: 0.5 });
  }

  _updateFlashes(dt) {
    this.flashZones = this.flashZones
      .map(f => ({ ...f, timer: f.timer - dt, alpha: Math.max(0, (f.timer - dt) / 0.5 * 0.55) }))
      .filter(f => f.timer > 0);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  get allCustomers() {
    return [...this.tickets.values()].map(t => t.customer);
  }

  get queueTickets() {
    return this.queue.map(id => this.tickets.get(id));
  }

  get pickupTickets() {
    return this.atPickup.map(id => this.tickets.get(id));
  }
}
