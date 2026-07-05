import { COLS, ROWS, TILE } from './constants';
import { p1Input, p2Input } from './input';
import { Player } from './player';
import { StoreManager } from './storemanager';
import { initRenderer, clear, drawTiles, drawPlayer, drawCustomers, setViewScale } from './renderer';
import { updateHUD, hideStartScreen, updateSpeechBubbles, showDayEnd, hideDayEnd } from './hud';
import type { Customer } from './customer';
import { Level, setCurrentLevel } from './level';
import { storeLevel } from './levels/store';

declare global {
  interface Window {
    __game: {
      readonly player: Player;
      readonly player2: Player | null;
      readonly sm: StoreManager;
    };
  }
}

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
initRenderer(canvas);

// ── Screen-fit: size the canvas to fill #stage, preserving aspect ratio ──────
const stage   = document.getElementById('stage')!;
const overlay = document.getElementById('canvas-overlay')!;

function fitCanvas(): void {
  const logicalW = COLS * TILE;
  const logicalH = ROWS * TILE;
  const scale = Math.min(stage.clientWidth / logicalW, stage.clientHeight / logicalH);
  const cssW  = Math.floor(logicalW * scale);
  const cssH  = Math.floor(logicalH * scale);
  const dpr   = window.devicePixelRatio || 1;

  canvas.width  = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width  = `${cssW}px`;
  canvas.style.height = `${cssH}px`;

  const left = Math.floor((stage.clientWidth  - cssW) / 2);
  const top  = Math.floor((stage.clientHeight - cssH) / 2);
  canvas.style.left  = `${left}px`;
  canvas.style.top   = `${top}px`;
  overlay.style.left   = `${left}px`;
  overlay.style.top    = `${top}px`;
  overlay.style.width  = `${cssW}px`;
  overlay.style.height = `${cssH}px`;

  setViewScale(cssW / logicalW, dpr);
}

window.addEventListener('resize', fitCanvas);
fitCanvas();

// Load the level before anything that reads it (StoreManager builds its stations
// from the level; Player collision and rendering query it too).
const level = new Level(storeLevel);
setCurrentLevel(level);

let sm       = new StoreManager();
const player = new Player(level.def.spawn.x, level.def.spawn.y, p1Input);
let player2: Player | null = null;

// Exposed for debugging in the browser console.
window.__game = { get player() { return player; }, get player2() { return player2; }, get sm() { return sm; } };

let lastTime: number | null = null;
let running  = false;
let elapsed  = 0;

function gameLoop(timestamp: number): void {
  if (!running) return;

  if (lastTime === null) lastTime = timestamp;
  const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
  lastTime = timestamp;
  elapsed += dt;

  // P1 interact
  if (p1Input.consumeInteract()) sm.handleInteraction(player);

  // P2: join on first press, interact on subsequent presses
  if (!player2) {
    if (p2Input.consumeInteract()) player2 = new Player(level.def.spawn2.x, level.def.spawn2.y, p2Input);
  } else {
    if (p2Input.consumeInteract()) sm.handleInteraction(player2);
  }

  // Update
  player.update(dt);
  if (player2) player2.update(dt);
  sm.update(dt, player, player2);
  for (const c of sm.allCustomers) c.update(dt);

  // Build remaining-cans map for customer sprite labels
  const customerRemaining = new Map<Customer, number>();
  for (const t of sm.tickets.values()) {
    customerRemaining.set(t.customer, t.cansNeeded - t.cansDelivered);
  }

  // Render
  clear();
  drawTiles(sm.flashZones, sm.shakers, sm.tintMachine, elapsed);
  drawCustomers(sm.allCustomers, customerRemaining);
  drawPlayer(player, '#3399ee', elapsed);
  if (player2) drawPlayer(player2, '#ee8822', elapsed);

  // HUD
  updateHUD(sm, player, player2);
  const queueCustomers  = sm.queueTickets.map(t => t.customer);
  const pickupCustomers = sm.pickupTickets.map(t => t.customer);
  updateSpeechBubbles(queueCustomers, pickupCustomers, dt);

  // Day end
  if (sm.dayOver) {
    running = false;
    showDayEnd(sm);
    return;
  }

  requestAnimationFrame(gameLoop);
}

document.getElementById('start-btn')!.addEventListener('click', () => {
  hideStartScreen();
  running = true;
  requestAnimationFrame(gameLoop);
});

document.getElementById('new-day-btn')!.addEventListener('click', () => {
  sm = new StoreManager();
  player.clearItems();
  player.x = level.def.spawn.x; player.y = level.def.spawn.y;
  player2 = null;
  lastTime = null;
  elapsed  = 0;
  hideDayEnd();
  running = true;
  requestAnimationFrame(gameLoop);
});
