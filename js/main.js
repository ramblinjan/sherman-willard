import { initInput, consumeInteract } from './input.js';
import { Player } from './player.js';
import { StoreManager } from './storemanager.js';
import { initRenderer, clear, drawTiles, drawPlayer, drawCustomers } from './renderer.js';
import { updateHUD, hideStartScreen, updateSpeechBubbles } from './hud.js';

const canvas = document.getElementById('game-canvas');
initRenderer(canvas);
initInput();

const player = new Player();
const sm     = new StoreManager();

// Exposed for debugging in the browser console.
window.__game = { player, sm };

let lastTime = null;
let running  = false;
let elapsed  = 0;

function gameLoop(timestamp) {
  if (!running) return;

  if (lastTime === null) lastTime = timestamp;
  const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
  lastTime = timestamp;
  elapsed += dt;

  // Input
  if (consumeInteract()) {
    sm.handleInteraction(player);
  }

  // Update
  player.update(dt);
  sm.update(dt, player);
  for (const c of sm.allCustomers) c.update(dt);

  // Render
  clear();
  drawTiles(sm.flashZones, sm.shakers, elapsed);
  drawCustomers(sm.allCustomers);
  drawPlayer(player);

  // HUD
  updateHUD(sm, player);
  updateSpeechBubbles(sm.allCustomers);

  requestAnimationFrame(gameLoop);
}

document.getElementById('start-btn').addEventListener('click', () => {
  hideStartScreen();
  running = true;
  requestAnimationFrame(gameLoop);
});
