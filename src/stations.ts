import { ZONE, SHAKE_DURATIONS, MAX_CARRY, CELEBRATION_TIME } from './constants';
import type { ZoneId } from './constants';
import type { BaseType, Rect } from './types';
import { TICKET_STATUS } from './ticket';
import { makeCan } from './item';
import { showCelebration } from './hud';
import type { Player } from './player';
import type { StoreManager } from './storemanager';

// A rug footprint tagged with the zone it serves — the input to buildStations().
export interface RugDef extends Rect { zone: ZoneId; }

// What a station tells the HUD to show when a player stands on it.
// A non-null prompt also means "this station is active" → the player gets the
// action badge and player.activeZone is set. showKey:false hides the [E] hint
// (used for passive status like "Shaking… 3s").
export interface StationPrompt { text: string; showKey?: boolean; }

// A station is one interaction point in the store. Adding a new kind of station
// is now self-contained: implement prompt() + onInteract() and add it to a level.
export interface Station {
  id: string;
  type: string;
  zone: ZoneId;          // drives player.activeZone + the badge icon
  footprint: Rect;       // tiles the player operates from
  prompt(sm: StoreManager, player: Player): StationPrompt | null;
  onInteract(sm: StoreManager, player: Player): void;
}

const lastName = (full: string): string => full.split(' ').pop() ?? full;
const rectOf = (r: { col: number; row: number; w: number; h: number }): Rect =>
  ({ col: r.col, row: r.row, w: r.w, h: r.h });

// ── Register ────────────────────────────────────────────────────────────────

function makeRegister(rug: RugDef): Station {
  return {
    id: 'register', type: 'register', zone: rug.zone, footprint: rectOf(rug),

    prompt(sm, player) {
      if (sm.queue.length === 0 || sm.freePickupSlots.length === 0) return null;
      const next = sm.tickets.get(sm.queue[0]);
      const canCount = next?.order.canCount ?? 1;
      if (player.totalHeld + canCount > MAX_CARRY) return null;
      return { text: canCount > 1 ? `Take Order (×${canCount})` : 'Take Order' };
    },

    onInteract(sm, player) {
      if (sm.queue.length === 0) return;
      if (sm.freePickupSlots.length === 0) return;

      const ticketId = sm.queue[0];
      const ticket   = sm.tickets.get(ticketId);
      if (!ticket) return;
      const canCount = ticket.order.canCount;
      if (player.totalHeld + canCount > MAX_CARRY) return;

      sm.queue.shift();
      ticket.status = TICKET_STATUS.BASE_GRABBED;
      for (let i = 0; i < canCount; i++) player.held.push(makeCan(ticketId));

      const pickupSlot  = sm.freePickupSlots.shift()!;
      ticket.pickupSlot = pickupSlot;
      sm.atPickup.push(ticketId);
      ticket.customer.moveToPickup(pickupSlot);

      sm.queue.forEach((id, i) => sm.tickets.get(id)?.customer.advanceQueue(i));
      sm.requestLine(ticket);
    },
  };
}

// ── Shelf (white / gray / deep base) ──────────────────────────────────────────

const SHELF_LABEL: Record<BaseType, string> = {
  WHITE: 'Grab White Base', GRAY: 'Grab Gray Base', DEEP: 'Grab Deep Base',
};

function makeShelf(rug: RugDef, baseType: BaseType): Station {
  return {
    id: `shelf-${baseType}`, type: 'shelf', zone: rug.zone, footprint: rectOf(rug),

    prompt(sm, player) {
      const canGrab = player.held.some(e => {
        if (e.stage !== 'empty') return false;
        const t = sm.tickets.get(e.ticketId);
        return t != null && t.order.baseType === baseType;
      });
      return canGrab ? { text: SHELF_LABEL[baseType] } : null;
    },

    onInteract(sm, player) {
      const entry = player.held.find(e => {
        if (e.stage !== 'empty') return false;
        const t = sm.tickets.get(e.ticketId);
        return t != null && t.order.baseType === baseType;
      });
      if (entry) {
        entry.baseType = baseType;
        entry.stage    = 'based';
      } else if (player.held.some(e => e.stage === 'empty')) {
        sm.addFlash(rug.zone);
      }
    },
  };
}

// ── Tinter: input / body / output (share sm.tintMachine) ──────────────────────

function makeTintInput(rug: RugDef): Station {
  return {
    id: 'tint-input', type: 'tint-input', zone: rug.zone, footprint: rectOf(rug),

    prompt(_sm, player) {
      return player.held.some(e => e.stage === 'based') ? { text: 'Load Tinter' } : null;
    },

    onInteract(sm, player) {
      const idx = player.held.findIndex(e => e.stage === 'based');
      if (idx === -1) return;
      const [entry] = player.held.splice(idx, 1);
      const ticket  = sm.tickets.get(entry.ticketId);
      if (ticket) {
        ticket.status = TICKET_STATUS.TINT_QUEUED;
        sm.tintMachine.inputQueue.push(entry.ticketId);
      }
    },
  };
}

function makeTintBody(rug: RugDef): Station {
  return {
    id: 'tint-body', type: 'tint-body', zone: rug.zone, footprint: rectOf(rug),

    prompt(sm) {
      const tm = sm.tintMachine;
      if (tm.processing) return { text: `Tinting… ${Math.ceil(tm.processing.timer)}s`, showKey: false };
      if (tm.inputQueue.length > 0 && !tm.active) return { text: 'Start Tinter' };
      return null;
    },

    onInteract(sm) {
      const tm = sm.tintMachine;
      if (tm.inputQueue.length > 0 || tm.processing) tm.active = true;
    },
  };
}

function makeTintOutput(rug: RugDef): Station {
  return {
    id: 'tint-output', type: 'tint-output', zone: rug.zone, footprint: rectOf(rug),

    prompt(sm) {
      return sm.tintMachine.outputQueue.length > 0 ? { text: 'Seal Can' } : null;
    },

    onInteract(sm, player) {
      const tm = sm.tintMachine;
      if (tm.outputQueue.length === 0) return;
      if (player.totalHeld >= MAX_CARRY) return;

      const ticketId = tm.outputQueue.shift()!;
      const ticket   = sm.tickets.get(ticketId);
      if (ticket) ticket.status = TICKET_STATUS.SEALED;
      const sealed = makeCan(ticketId);
      sealed.stage    = 'sealed';
      sealed.baseType = ticket ? ticket.order.baseType : null;
      player.held.push(sealed);
      tm.bangTimer = 0.6;
    },
  };
}

// ── Shaker A / B / C (each owns one slot of sm.shakers) ───────────────────────

function makeShaker(rug: RugDef, index: number): Station {
  return {
    id: `shaker-${index}`, type: 'shaker', zone: rug.zone, footprint: rectOf(rug),

    prompt(sm, player) {
      const shaker = sm.shakers[index];
      if (shaker.status === 'shaking') {
        return { text: `Shaking… ${Math.ceil(shaker.timer)}s`, showKey: false };
      }
      if (shaker.status === 'ready') {
        const ticket = sm.tickets.get(shaker.ticketId!);
        return { text: ticket ? `Collect for ${lastName(ticket.order.customerName)}` : 'Collect Paint' };
      }
      return player.held.some(e => e.stage === 'sealed') ? { text: 'Load Shaker' } : null;
    },

    onInteract(sm, player) {
      const shaker = sm.shakers[index];

      if (shaker.status === 'ready') {
        const ticket = sm.tickets.get(shaker.ticketId!);
        if (ticket) {
          const mixed = makeCan(shaker.ticketId!);
          mixed.stage    = 'mixed';
          mixed.baseType = ticket.order.baseType;
          player.held.push(mixed);
          ticket.status = TICKET_STATUS.AT_PICKUP;
        }
        shaker.ticketId = null;
        shaker.timer    = 0;
        shaker.status   = 'idle';
        return;
      }

      const sealedIdx = player.held.findIndex(e => e.stage === 'sealed');
      if (shaker.status === 'idle' && sealedIdx !== -1) {
        const [entry] = player.held.splice(sealedIdx, 1);
        const ticket  = sm.tickets.get(entry.ticketId);
        if (!ticket) return;
        shaker.ticketId = entry.ticketId;
        shaker.timer    = SHAKE_DURATIONS[ticket.order.baseType];
        shaker.status   = 'shaking';
        ticket.status   = TICKET_STATUS.SHAKING;
        ticket.shakerId = index;
      }
    },
  };
}

// ── Pickup ────────────────────────────────────────────────────────────────────

function makePickup(rug: RugDef): Station {
  return {
    id: 'pickup', type: 'pickup', zone: rug.zone, footprint: rectOf(rug),

    prompt(sm, player) {
      const canDeliver = player.held.some(e => e.stage === 'mixed' && sm.atPickup.includes(e.ticketId));
      return canDeliver ? { text: 'Hand Off Paint' } : null;
    },

    onInteract(sm, player) {
      const idx = player.held.findIndex(e => e.stage === 'mixed' && sm.atPickup.includes(e.ticketId));
      if (idx === -1) return;

      const { ticketId } = player.held.splice(idx, 1)[0];
      const ticket = sm.tickets.get(ticketId);
      if (!ticket) return;

      ticket.cansDelivered++;
      if (!ticket.isComplete) return;

      sm.score++;
      sm.gallonsSold += ticket.order.canCount;
      sm.atPickup = sm.atPickup.filter(id => id !== ticketId);
      sm.freePickupSlots.push(ticket.pickupSlot!);
      sm.freePickupSlots.sort((a, b) => a - b);

      ticket.status = TICKET_STATUS.DONE;
      sm.requestLine(ticket);
      ticket.customer.leave();

      showCelebration(true);
      sm.celebrationTimer = CELEBRATION_TIME;
      setTimeout(() => sm.tickets.delete(ticketId), 4000);
    },
  };
}

// ── Registry builder ──────────────────────────────────────────────────────────

const SHAKER_ZONES: ZoneId[] = [ZONE.SHAKER_A, ZONE.SHAKER_B, ZONE.SHAKER_C];
const SHELF_BASE: Partial<Record<ZoneId, BaseType>> = {
  [ZONE.SHELF_WHITE]: 'WHITE', [ZONE.SHELF_GRAY]: 'GRAY', [ZONE.SHELF_DEEP]: 'DEEP',
};

// Build a level's stations from its rug footprints (one station per rug,
// behavior chosen by the rug's zone).
export function buildStations(rugs: RugDef[]): Station[] {
  const stations: Station[] = [];
  for (const rug of rugs) {
    const shelfBase = SHELF_BASE[rug.zone];
    const shakerIdx = SHAKER_ZONES.indexOf(rug.zone);
    if (rug.zone === ZONE.REGISTER)               stations.push(makeRegister(rug));
    else if (rug.zone === ZONE.PICKUP)            stations.push(makePickup(rug));
    else if (rug.zone === ZONE.TINT_INPUT)        stations.push(makeTintInput(rug));
    else if (rug.zone === ZONE.TINT_MACHINE_BODY) stations.push(makeTintBody(rug));
    else if (rug.zone === ZONE.TINT_OUTPUT)       stations.push(makeTintOutput(rug));
    else if (shelfBase)                           stations.push(makeShelf(rug, shelfBase));
    else if (shakerIdx !== -1)                    stations.push(makeShaker(rug, shakerIdx));
  }
  return stations;
}
