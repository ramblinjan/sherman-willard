import { TILE, COLS, ROWS } from './constants.js';
import { isWalkable } from './tilemap.js';
import { getMoveDelta } from './input.js';

const SPEED = 4.5; // tiles per second

export class Player {
  constructor() {
    this.x = 9;   // tile position (float)
    this.y = 9;
    this.heldBase = null;
    this.heldTint = null;
    this.heldMixedCan = null;    // the order object when holding a mixed can
    this.activeTaskId = null;    // ticket ID currently being fetched/loaded
    this.deliveryTicketId = null; // ticket ID whose can is being carried to pickup
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
    this.heldBase = null;
    this.heldTint = null;
    this.heldMixedCan = null;
    this.activeTaskId = null;
    this.deliveryTicketId = null;
  }

  get px() { return this.x * TILE; }
  get py() { return this.y * TILE; }
}
