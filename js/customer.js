import { TILE } from './constants.js';

const WALK_SPEED = 3.5; // tiles per second

export const QUEUE_POSITIONS = [
  { x: 4, y: 13 }, { x: 6, y: 13 }, { x: 8, y: 13 },  // front row
  { x: 4, y: 14 }, { x: 6, y: 14 }, { x: 8, y: 14 },  // back row
];
export const PICKUP_POSITIONS = [
  { x: 15, y: 13 }, { x: 14, y: 13 }, { x: 16, y: 13 },
  { x: 15, y: 14 }, { x: 14, y: 14 }, { x: 16, y: 14 },
];
const EXIT_TILE  = { x: 21.5, y: 13 };

export class Customer {
  constructor() {
    this.x = 0;
    this.y = 16;
    this.state = 'OFFSCREEN'; // OFFSCREEN | WALKING_IN | WAITING | WALKING_OUT | GONE
    this.currentOrder = null;
    this.persona = null;
    this.speech = { text: '', state: 'hidden' }; // hidden | loading | shown
    this.reqId = 0; // bumped each arrival; guards stale async dialogue
    this._targetX = 0;
    this._targetY = 16;
  }

  // Spawn off-screen below the queue slot and walk up to it.
  arrive(order, persona, queueSlot) {
    this.currentOrder = order;
    this.persona = persona;
    this.reqId++;
    this.speech = { text: '', state: 'hidden' };
    const pos = QUEUE_POSITIONS[queueSlot];
    this.x = pos.x;
    this.y = 15.5;
    this._targetX = pos.x;
    this._targetY = pos.y;
    this.state = 'WALKING_IN';
  }

  // Shift one slot forward in the queue (called when front slot is taken).
  advanceQueue(newSlot) {
    const pos = QUEUE_POSITIONS[newSlot];
    this._targetX = pos.x;
    this._targetY = pos.y;
    if (this.state === 'WAITING') this.state = 'WALKING_IN';
  }

  // After order taken — walk from queue position to a pickup waiting slot.
  moveToPickup(pickupSlot) {
    const pos = PICKUP_POSITIONS[pickupSlot];
    this._targetX = pos.x;
    this._targetY = pos.y;
    this.state = 'WALKING_IN';
  }

  leave() {
    this.speech = { text: '', state: 'hidden' };
    this._targetX = EXIT_TILE.x;
    this._targetY = EXIT_TILE.y;
    this.state = 'WALKING_OUT';
  }

  update(dt) {
    if (this.state === 'WALKING_IN' || this.state === 'WALKING_OUT') {
      this._moveToward(dt);
    }
  }

  _moveToward(dt) {
    const dx = this._targetX - this.x;
    const dy = this._targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.05) {
      this.x = this._targetX;
      this.y = this._targetY;
      this.state = this.state === 'WALKING_IN' ? 'WAITING' : 'GONE';
      return;
    }
    const step = Math.min(WALK_SPEED * dt, dist);
    this.x += (dx / dist) * step;
    this.y += (dy / dist) * step;
  }

  get visible() {
    return this.state !== 'OFFSCREEN' && this.state !== 'GONE';
  }

  get px() { return this.x * TILE; }
  get py() { return this.y * TILE; }
}
