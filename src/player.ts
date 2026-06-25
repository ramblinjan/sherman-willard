import { TILE, COLS, ROWS } from './constants';
import type { ZoneId } from './constants';
import { isWalkable } from './tilemap';
import { p1Input } from './input';
import type { InputHandler } from './input';
import type { BaseType, Order } from './types';

const SPEED = 4.5; // tiles per second

// Transitional inventory shapes — replaced by a unified Item model in A2.
interface BaseCan { ticketId: number; baseType: BaseType | null; }
interface SealedCan { ticketId: number; }
interface MixedCan { ticketId: number; order: Order; }

export class Player {
  x: number;
  y: number;
  input: InputHandler;
  cans:       BaseCan[]   = [];  // grabbed base, going to tint machine
  sealedCans: SealedCan[] = [];  // tinted+sealed, going to shaker
  mixedCans:  MixedCan[]  = [];  // mixed, going to pickup
  facingX = 0;
  facingY = 1;
  activeZone: ZoneId | null = null; // set each frame by StoreManager; null = no valid action

  constructor(x = 9, y = 9, inputHandler: InputHandler = p1Input) {
    this.x = x;
    this.y = y;
    this.input = inputHandler;
  }

  update(dt: number): void {
    const { dx, dy } = this.input.getMoveDelta();

    if (dx !== 0 || dy !== 0) {
      this.facingX = dx;
      this.facingY = dy;
    }

    const speed = SPEED * dt;
    const nx = this.x + dx * speed;
    const ny = this.y + dy * speed;

    if (dx !== 0 && this._canMove(nx, this.y)) this.x = nx;
    if (dy !== 0 && this._canMove(this.x, ny)) this.y = ny;

    this.x = Math.max(0.5, Math.min(COLS - 0.5, this.x));
    this.y = Math.max(0.5, Math.min(ROWS - 0.5, this.y));

  }

  private _canMove(tx: number, ty: number): boolean {
    const margin = 0.35;
    return [
      [tx - margin, ty - margin],
      [tx + margin, ty - margin],
      [tx - margin, ty + margin],
      [tx + margin, ty + margin],
    ].every(([cx, cy]) => isWalkable(Math.floor(cx), Math.floor(cy)));
  }

  clearItems(): void {
    this.cans       = [];
    this.sealedCans = [];
    this.mixedCans  = [];
  }

  get totalHeld(): number {
    return this.cans.length + this.sealedCans.length + this.mixedCans.length;
  }

  get px(): number { return this.x * TILE; }
  get py(): number { return this.y * TILE; }
}
