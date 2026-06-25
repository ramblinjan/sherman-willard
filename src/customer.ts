import { TILE } from './constants';
import type { Point, Order } from './types';
import type { CustomerCharacter } from './dialogue';

const WALK_SPEED = 3.5; // tiles per second

export const QUEUE_POSITIONS: Point[] = [
  { x: 4, y: 13 }, { x: 6, y: 13 }, { x: 8, y: 13 },  // front row
  { x: 4, y: 14 }, { x: 6, y: 14 }, { x: 8, y: 14 },  // back row
];
export const PICKUP_POSITIONS: Point[] = [
  { x: 12, y: 13 }, { x: 14, y: 13 }, { x: 16, y: 13 },
  { x: 12, y: 14 }, { x: 14, y: 14 }, { x: 16, y: 14 },
];
const EXIT_TILE: Point = { x: 21.5, y: 13 };

export type CustomerState =
  'OFFSCREEN' | 'WALKING_IN' | 'WAITING' | 'WALKING_OUT' | 'GONE';

export interface Speech { state: 'hidden' | 'shown'; text?: string; }

export class Customer {
  x = 0;
  y = 16;
  state: CustomerState = 'OFFSCREEN';
  currentOrder: Order | null = null;
  lines: string[] = []; // 3 sequential lines: [intro, funny, impatient]
  speech: Speech = { state: 'hidden' };
  reqId = 0; // bumped each arrival; guards stale dialogue
  private _targetX = 0;
  private _targetY = 16;

  // Spawn off-screen below the queue slot and walk up to it.
  arrive(order: Order, character: CustomerCharacter, queueSlot: number): void {
    this.currentOrder = order;
    this.lines = character?.lines ?? [];
    this.reqId++;
    this.speech = { state: 'hidden' };
    const pos = QUEUE_POSITIONS[queueSlot];
    this.x = pos.x;
    this.y = 15.5;
    this._targetX = pos.x;
    this._targetY = pos.y;
    this.state = 'WALKING_IN';
  }

  // Shift one slot forward in the queue (called when front slot is taken).
  advanceQueue(newSlot: number): void {
    const pos = QUEUE_POSITIONS[newSlot];
    this._targetX = pos.x;
    this._targetY = pos.y;
    if (this.state === 'WAITING') this.state = 'WALKING_IN';
  }

  // After order taken — walk from queue position to a pickup waiting slot.
  moveToPickup(pickupSlot: number): void {
    const pos = PICKUP_POSITIONS[pickupSlot];
    this._targetX = pos.x;
    this._targetY = pos.y;
    this.state = 'WALKING_IN';
  }

  leave(): void {
    this.speech = { text: '', state: 'hidden' };
    this._targetX = EXIT_TILE.x;
    this._targetY = EXIT_TILE.y;
    this.state = 'WALKING_OUT';
  }

  update(dt: number): void {
    if (this.state === 'WALKING_IN' || this.state === 'WALKING_OUT') {
      this._moveToward(dt);
    }
  }

  private _moveToward(dt: number): void {
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

  get visible(): boolean {
    return this.state !== 'OFFSCREEN' && this.state !== 'GONE';
  }

  get px(): number { return this.x * TILE; }
  get py(): number { return this.y * TILE; }
}
