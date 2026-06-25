import { p1Input, p2Input } from './input';
import { Player } from './player';
import { StoreManager } from './storemanager';
import { initRenderer, clear, drawTiles, drawPlayer, drawCustomers } from './renderer';
import { updateHUD, hideStartScreen, updateSpeechBubbles, showDayEnd, hideDayEnd } from './hud';
import type { Customer } from './customer';

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

let sm       = new StoreManager();
const player = new Player(9, 9, p1Input);
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
    if (p2Input.consumeInteract()) player2 = new Player(11, 9, p2Input);
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
  player.x = 9; player.y = 9;
  player2 = null;
  lastTime = null;
  elapsed  = 0;
  hideDayEnd();
  running = true;
  requestAnimationFrame(gameLoop);
});
