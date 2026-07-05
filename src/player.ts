import { TILE, COLS, ROWS } from './constants';
import type { ZoneId } from './constants';
import { currentLevel } from './level';
import { p1Input } from './input';
import type { InputHandler } from './input';
import type { Item } from './item';

const SPEED = 4.5; // tiles per second
const DASH_MULT     = 3;    // speed multiplier while dashing
const DASH_TIME     = 0.18; // seconds of boosted speed per dash
const DASH_COOLDOWN = 1.4;  // seconds before the next dash is available

export class Player {
  x: number;
  y: number;
  input: InputHandler;
  held: Item[] = [];  // everything the player is currently carrying (cans at any stage)
  facingX = 0;
  facingY = 1;
  activeZone: ZoneId | null = null; // set each frame by StoreManager; null = no valid action
  dashTime = 0;
  dashCooldown = 0;

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

    if (this.dashTime > 0)     this.dashTime     -= dt;
    if (this.dashCooldown > 0) this.dashCooldown -= dt;
    // Dash only triggers while moving — no standing-still bursts
    if (this.input.consumeDash() && this.dashCooldown <= 0 && (dx !== 0 || dy !== 0)) {
      this.dashTime     = DASH_TIME;
      this.dashCooldown = DASH_COOLDOWN;
    }

    const speed = SPEED * (this.dashTime > 0 ? DASH_MULT : 1) * dt;
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
    ].every(([cx, cy]) => currentLevel().isWalkable(Math.floor(cx), Math.floor(cy)));
  }

  clearItems(): void {
    this.held = [];
  }

  // 0 = just dashed, 1 = fully recharged (for the HUD cooldown bar)
  get dashReadiness(): number {
    return Math.max(0, Math.min(1, 1 - this.dashCooldown / DASH_COOLDOWN));
  }

  get totalHeld(): number {
    return this.held.length;
  }

  get px(): number { return this.x * TILE; }
  get py(): number { return this.y * TILE; }
}
