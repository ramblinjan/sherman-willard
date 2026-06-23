import { TILE, COLS, ROWS } from './constants.js';
import { isWalkable } from './tilemap.js';
import { getMoveDelta } from './input.js';

const SPEED = 4.5; // tiles per second

export class Player {
  constructor() {
    this.x = 9;
    this.y = 9;
    this.cans       = [];  // { ticketId, baseType } — grabbed base, going to tint machine
    this.sealedCans = [];  // { ticketId }           — tinted+sealed, going to shaker
    this.mixedCans  = [];  // { ticketId, order }    — mixed, going to pickup
    this.facingX = 0;
    this.facingY = 1;
  }

  update(dt) {
    const { dx, dy } = getMoveDelta();

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

  _canMove(tx, ty) {
    const margin = 0.35;
    return [
      [tx - margin, ty - margin],
      [tx + margin, ty - margin],
      [tx - margin, ty + margin],
      [tx + margin, ty + margin],
    ].every(([cx, cy]) => isWalkable(Math.floor(cx), Math.floor(cy)));
  }

  clearItems() {
    this.cans       = [];
    this.sealedCans = [];
    this.mixedCans  = [];
  }

  get totalHeld() {
    return this.cans.length + this.sealedCans.length + this.mixedCans.length;
  }

  get px() { return this.x * TILE; }
  get py() { return this.y * TILE; }
}
