import { ZONE, SHAKE_DURATIONS } from './constants.js';
import { getNearbyInteractZone } from './tilemap.js';
import { generateOrder } from './order.js';
import { Customer, QUEUE_POSITIONS, PICKUP_POSITIONS } from './customer.js';
import { OrderTicket, TICKET_STATUS } from './ticket.js';
import { showPrompt, showCelebration } from './hud.js';
import { pickPersona, generateLine } from './dialogue.js';

const MAX_QUEUE     = 3;
const SPAWN_INTERVAL = 8;   // seconds between spawn attempts
const CELEBRATION_TIME = 2.0;

const SHAKER_ZONES = [ZONE.SHAKER_A, ZONE.SHAKER_B, ZONE.SHAKER_C];

export class StoreManager {
  constructor() {
    this.tickets = new Map();   // id → OrderTicket
    this.queue = [];            // ticket IDs waiting at register
    this.atPickup = [];         // ticket IDs waiting at pickup window
    this.shakers = [
      { ticketId: null, timer: 0, status: 'idle' },
      { ticketId: null, timer: 0, status: 'idle' },
      { ticketId: null, timer: 0, status: 'idle' },
    ];
    this.score = 0;
    this.flashZones = [];

    this._ticketSeq = 0;
    this._spawnTimer = 1.0; // quick first spawn
    this._celebrationTimer = 0;
    this._freePickupSlots = [0, 1, 2]; // available pickup positions
  }

  // ── Main update ──────────────────────────────────────────────────────────

  update(dt, player) {
    this._updateFlashes(dt);
    this._tickShakers(dt);
    this._tickSpawn(dt);

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

    // Register — take front queued order
    if (zone === ZONE.REGISTER) {
      if (this.queue.length > 0 && player.activeTaskId == null && player.heldMixedCan == null) {
        this._takeOrder(player);
      }
      return;
    }

    // Shelves — grab base paint for active task
    const baseMap = {
      [ZONE.SHELF_WHITE]: 'WHITE',
      [ZONE.SHELF_GRAY]:  'GRAY',
      [ZONE.SHELF_DEEP]:  'DEEP',
    };
    if (baseMap[zone] != null) {
      this._grabBase(player, baseMap[zone], zone);
      return;
    }

    // Tint station
    if (zone === ZONE.TINT_STATION) {
      this._grabTint(player);
      return;
    }

    // Shakers
    const shakerIdx = SHAKER_ZONES.indexOf(zone);
    if (shakerIdx !== -1) {
      this._interactShaker(player, shakerIdx);
      return;
    }

    // Pickup window
    if (zone === ZONE.PICKUP) {
      this._deliverPaint(player);
    }
  }

  // ── Private: order flow ──────────────────────────────────────────────────

  _takeOrder(player) {
    const ticketId = this.queue.shift();
    const ticket = this.tickets.get(ticketId);
    ticket.status = TICKET_STATUS.FETCHING_BASE;
    player.activeTaskId = ticketId;

    // Move customer to pickup window
    const pickupSlot = this._freePickupSlots.shift();
    ticket.pickupSlot = pickupSlot;
    this.atPickup.push(ticketId);
    ticket.customer.moveToPickup(pickupSlot);

    // Remaining queue customers shift forward
    this.queue.forEach((id, i) => {
      this.tickets.get(id).customer.advanceQueue(i);
    });

    // Fire ORDER speech bubble
    this._requestLine(ticket, 'ORDER');
  }

  _grabBase(player, grabbed, zone) {
    if (player.activeTaskId == null) return;
    const ticket = this.tickets.get(player.activeTaskId);
    if (!ticket || ticket.status !== TICKET_STATUS.FETCHING_BASE) return;

    if (grabbed === ticket.order.baseType) {
      player.heldBase = grabbed;
      ticket.status = TICKET_STATUS.FETCHING_TINT;
    } else {
      this._addFlash(zone);
    }
  }

  _grabTint(player) {
    if (player.activeTaskId == null || !player.heldBase) return;
    const ticket = this.tickets.get(player.activeTaskId);
    if (!ticket || ticket.status !== TICKET_STATUS.FETCHING_TINT) return;

    player.heldTint = ticket.order.tintCode;
    ticket.status = TICKET_STATUS.LOADING_SHAKER;
  }

  _interactShaker(player, idx) {
    const shaker = this.shakers[idx];

    // Collect from a ready shaker
    if (shaker.status === 'ready') {
      const ticket = this.tickets.get(shaker.ticketId);
      player.heldMixedCan = ticket.order;
      player.deliveryTicketId = shaker.ticketId;
      ticket.status = TICKET_STATUS.AT_PICKUP;
      shaker.ticketId = null;
      shaker.timer = 0;
      shaker.status = 'idle';
      return;
    }

    // Load the shaker with current base+tint
    if (shaker.status === 'idle' && player.activeTaskId != null) {
      const ticket = this.tickets.get(player.activeTaskId);
      if (!ticket || ticket.status !== TICKET_STATUS.LOADING_SHAKER) return;

      shaker.ticketId = player.activeTaskId;
      shaker.timer = SHAKE_DURATIONS[ticket.order.baseType];
      shaker.status = 'shaking';
      ticket.status = TICKET_STATUS.SHAKING;
      ticket.shakerId = idx;

      player.heldBase = null;
      player.heldTint = null;
      player.activeTaskId = null;
    }
  }

  _deliverPaint(player) {
    if (player.deliveryTicketId == null) return;
    const ticketId = player.deliveryTicketId;
    if (!this.atPickup.includes(ticketId)) return;

    const ticket = this.tickets.get(ticketId);
    this.score++;
    this.atPickup = this.atPickup.filter(id => id !== ticketId);
    this._freePickupSlots.push(ticket.pickupSlot);
    this._freePickupSlots.sort();

    ticket.status = TICKET_STATUS.DONE;
    player.heldMixedCan = null;
    player.deliveryTicketId = null;

    // Fire PICKUP speech, then customer leaves
    this._requestLine(ticket, 'PICKUP');
    ticket.customer.leave();

    showCelebration(true);
    this._celebrationTimer = CELEBRATION_TIME;

    // Clean up ticket after a brief delay (customer walking away)
    setTimeout(() => this.tickets.delete(ticketId), 4000);
  }

  // ── Private: spawning ────────────────────────────────────────────────────

  _tickSpawn(dt) {
    this._spawnTimer -= dt;
    if (this._spawnTimer > 0) return;
    this._spawnTimer = SPAWN_INTERVAL;

    if (this.queue.length >= MAX_QUEUE) return;

    const slot = this.queue.length; // next free queue slot
    const order = generateOrder();
    const customer = new Customer();
    const id = ++this._ticketSeq;
    const ticket = new OrderTicket(id, customer, order);
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
        if (ticket) ticket.status = TICKET_STATUS.READY;
      }
    }
  }

  // ── Private: prompts ─────────────────────────────────────────────────────

  _updatePrompt(player) {
    const zone = getNearbyInteractZone(player.x, player.y);
    if (!zone) { showPrompt(null); return; }

    // Shaker prompts vary by shaker state
    const shakerIdx = SHAKER_ZONES.indexOf(zone);
    if (shakerIdx !== -1) {
      const shaker = this.shakers[shakerIdx];
      if (shaker.status === 'shaking') {
        showPrompt(`Shaking… ${Math.ceil(shaker.timer)}s`, false);
        return;
      }
      if (shaker.status === 'ready') {
        const ticket = this.tickets.get(shaker.ticketId);
        const label = ticket ? `Collect for ${ticket.customer.currentOrder.customerName.split(' ').pop()}` : 'Collect Paint';
        showPrompt(label);
        return;
      }
      if (shaker.status === 'idle') {
        if (player.activeTaskId != null) {
          const ticket = this.tickets.get(player.activeTaskId);
          if (ticket && ticket.status === TICKET_STATUS.LOADING_SHAKER) {
            showPrompt('Load Shaker');
            return;
          }
        }
        showPrompt(null);
        return;
      }
    }

    // Register
    if (zone === ZONE.REGISTER) {
      if (this.queue.length > 0 && player.activeTaskId == null && player.heldMixedCan == null) {
        showPrompt('Take Order');
      } else {
        showPrompt(null);
      }
      return;
    }

    // Shelves
    if (zone === ZONE.SHELF_WHITE || zone === ZONE.SHELF_GRAY || zone === ZONE.SHELF_DEEP) {
      if (player.activeTaskId != null) {
        const ticket = this.tickets.get(player.activeTaskId);
        if (ticket && ticket.status === TICKET_STATUS.FETCHING_BASE) {
          const labels = { SHELF_WHITE: 'Grab White Base', SHELF_GRAY: 'Grab Gray Base', SHELF_DEEP: 'Grab Deep Base' };
          showPrompt(labels[zone]);
          return;
        }
      }
      showPrompt(null);
      return;
    }

    // Tint station
    if (zone === ZONE.TINT_STATION) {
      if (player.activeTaskId != null) {
        const ticket = this.tickets.get(player.activeTaskId);
        if (ticket && ticket.status === TICKET_STATUS.FETCHING_TINT) {
          showPrompt('Grab Tint');
          return;
        }
      }
      showPrompt(null);
      return;
    }

    // Pickup
    if (zone === ZONE.PICKUP) {
      if (player.deliveryTicketId != null && this.atPickup.includes(player.deliveryTicketId)) {
        showPrompt('Hand Off Paint');
        return;
      }
      showPrompt(null);
      return;
    }

    showPrompt(null);
  }

  // ── Private: dialogue ────────────────────────────────────────────────────

  _requestLine(ticket, phase) {
    const c = ticket.customer;
    if (!c.persona || !ticket.order) return;
    const line = generateLine(c.persona, phase, ticket.order);
    c.speech = { text: line, state: 'shown' };
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

  // ── Helpers for renderer/HUD ─────────────────────────────────────────────

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
