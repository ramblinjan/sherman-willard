import { TILE, COLS, ROWS, ZONE, TILE_COLORS, TINT_COLORS, BASE_COLORS, HUE_CODES } from './constants.js';
import { MAP } from './tilemap.js';

// Shaker layout: three 3-wide × 2-tall blocks at rows 6-7
const SHAKERS = [
  { col: 1, label: 'A' },
  { col: 5, label: 'B' },
  { col: 9, label: 'C' },
];

const SHELF_ZONES = new Set([ZONE.SHELF_WHITE, ZONE.SHELF_GRAY, ZONE.SHELF_DEEP]);

let canvas, ctx;

export function initRenderer(c) {
  canvas = c;
  ctx = canvas.getContext('2d');
}

export function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// shakersState: array of { status, timer, ticketId }, one per shaker
// elapsed: total elapsed seconds (for animation)
export function drawTiles(flashZones, shakersState, elapsed) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const zone = MAP[row][col];
      const x = col * TILE;
      const y = row * TILE;
      const color = TILE_COLORS[zone] ?? '#555';
      ctx.fillStyle = color;
      ctx.fillRect(x, y, TILE, TILE);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.strokeRect(x, y, TILE, TILE);
    }
  }

  _drawShelfLabels();
  _drawTintRack();
  _drawCounter();
  _drawShakerMachines(shakersState, elapsed);

  if (flashZones) {
    for (const { zone, alpha } of flashZones) {
      _drawZoneFlash(zone, alpha);
    }
  }
}

function _drawShelfLabels() {
  _drawShelfBlock(1, 1, 4, 3, 'WHITE BASE', BASE_COLORS.WHITE, '#333');
  _drawShelfBlock(6, 1, 4, 3, 'GRAY BASE',  BASE_COLORS.GRAY,  '#fff');
  _drawShelfBlock(11, 1, 4, 3, 'DEEP BASE', BASE_COLORS.DEEP,  '#ddd');
}

function _drawShelfBlock(col, row, w, h, label, bg, textColor) {
  const x = col * TILE + 2;
  const y = row * TILE + 2;
  const pw = w * TILE - 4;
  const ph = h * TILE - 4;

  ctx.fillStyle = bg;
  _roundRect(x, y, pw, ph, 4);
  ctx.fill();

  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1.5;
  _roundRect(x, y, pw, ph, 4);
  ctx.stroke();
  ctx.lineWidth = 1;

  const canW = 14, canH = 18;
  const cansPerRow = Math.floor(pw / (canW + 6));
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < cansPerRow; c++) {
      const cx = x + 8 + c * (canW + 6);
      const cy = y + 8 + r * (canH + 6);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      _roundRect(cx, cy, canW, canH, 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      _roundRect(cx, cy, canW, canH, 2);
      ctx.stroke();
    }
  }

  ctx.fillStyle = textColor;
  ctx.font = 'bold 10px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(label, x + pw / 2, y + ph - 4);
}

function _drawTintRack() {
  const col = 16, row = 0, w = 4, h = 5;
  const x = col * TILE + 2;
  const y = row * TILE + 2;
  const pw = w * TILE - 4;
  const ph = h * TILE - 4;

  ctx.fillStyle = '#1a1530';
  _roundRect(x, y, pw, ph, 4);
  ctx.fill();
  ctx.strokeStyle = '#443366';
  ctx.lineWidth = 1.5;
  _roundRect(x, y, pw, ph, 4);
  ctx.stroke();
  ctx.lineWidth = 1;

  const swatchW = 16, swatchH = 20;
  const cols2 = 3;
  const startX = x + (pw - cols2 * (swatchW + 4) + 4) / 2;
  const startY = y + 14;

  HUE_CODES.forEach((hue, i) => {
    const sc = i % cols2;
    const sr = Math.floor(i / cols2);
    const sx = startX + sc * (swatchW + 4);
    const sy = startY + sr * (swatchH + 8);
    ctx.fillStyle = TINT_COLORS[hue];
    _roundRect(sx, sy, swatchW, swatchH, 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    _roundRect(sx, sy, swatchW, swatchH, 3);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 8px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hue, sx + swatchW / 2, sy + swatchH / 2);
  });

  ctx.fillStyle = '#9988cc';
  ctx.font = 'bold 9px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('TINT RACK', x + pw / 2, y + ph - 4);
}

function _drawShakerMachines(shakersState, elapsed) {
  SHAKERS.forEach(({ col, label }, idx) => {
    const state = shakersState ? shakersState[idx] : { status: 'idle', timer: 0 };
    const x = col * TILE + 2;
    const y = 6 * TILE + 2;       // rows 6-7 → pixel top at 6*32
    const pw = 3 * TILE - 4;
    const ph = 2 * TILE - 4;

    ctx.save();

    let offsetX = 0;
    let bgColor, borderColor, textColor, labelText;

    if (state.status === 'shaking') {
      offsetX = Math.sin((elapsed ?? 0) * 20) * 2.5;
      bgColor = '#3a5070';
      borderColor = '#ffe066';
      textColor = '#ffe066';
      labelText = `${Math.ceil(state.timer)}s`;
    } else if (state.status === 'ready') {
      bgColor = '#2e5a3e';
      borderColor = '#5fdd8f';
      textColor = '#5fdd8f';
      labelText = 'READY ✓';
    } else {
      bgColor = '#3a5070';
      borderColor = '#6090b0';
      textColor = '#88bbdd';
      labelText = `[${label}]`;
    }

    ctx.fillStyle = bgColor;
    _roundRect(x + offsetX, y, pw, ph, 5);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = state.status !== 'idle' ? 2.5 : 1.5;
    _roundRect(x + offsetX, y, pw, ph, 5);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Inner panel
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    _roundRect(x + offsetX + 8, y + 8, pw - 16, ph - 16, 3);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = `bold ${state.status === 'idle' ? 11 : 10}px Courier New`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, x + offsetX + pw / 2, y + ph / 2);

    ctx.restore();
  });
}

function _drawCounter() {
  const x = 0;
  const y = 12 * TILE;
  const pw = COLS * TILE;
  const ph = TILE;

  ctx.fillStyle = '#5a4a3a';
  ctx.fillRect(x, y, pw, ph);
  ctx.strokeStyle = '#7a6a5a';
  ctx.strokeRect(x, y, pw, ph);

  ctx.fillStyle = '#ffe066';
  ctx.font = 'bold 9px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('REGISTER', 4 * TILE, y + TILE / 2);
  ctx.fillText('PICKUP', 15 * TILE, y + TILE / 2);
}

function _drawZoneFlash(zone, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ff3333';

  const regions = {
    [ZONE.SHELF_WHITE]: { col: 1,  row: 1, w: 4, h: 3 },
    [ZONE.SHELF_GRAY]:  { col: 6,  row: 1, w: 4, h: 3 },
    [ZONE.SHELF_DEEP]:  { col: 11, row: 1, w: 4, h: 3 },
  };
  const r = regions[zone];
  if (r) ctx.fillRect(r.col * TILE, r.row * TILE, r.w * TILE, r.h * TILE);
  ctx.restore();
}

export function drawCustomers(customers) {
  for (const customer of customers) {
    if (!customer.visible) continue;
    _drawOneCustomer(customer);
  }
}

function _drawOneCustomer(customer) {
  const px = customer.px;
  const py = customer.py;

  ctx.fillStyle = '#ee8833';
  ctx.fillRect(px - 10, py - 14, 20, 24);

  ctx.fillStyle = '#ffddbb';
  ctx.beginPath();
  ctx.arc(px, py - 18, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#cc9966';
  ctx.lineWidth = 1;
  ctx.stroke();

  if (customer.state === 'WAITING' && customer.currentOrder) {
    ctx.fillStyle = 'rgba(10,10,20,0.75)';
    const name = customer.currentOrder.customerName.split(' ').pop(); // last name only
    ctx.font = '9px Courier New';
    const tw = ctx.measureText(name).width + 6;
    ctx.fillRect(px - tw / 2, py - 34, tw, 13);
    ctx.fillStyle = '#ffe';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(name, px, py - 32);
  }
}

export function drawPlayer(player) {
  const px = player.px;
  const py = player.py;

  ctx.fillStyle = '#3399ee';
  ctx.fillRect(px - 10, py - 14, 20, 24);

  ctx.fillStyle = '#ffcc99';
  ctx.beginPath();
  ctx.arc(px, py - 18, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#cc9966';
  ctx.lineWidth = 1;
  ctx.stroke();

  if (player.heldMixedCan) {
    ctx.fillStyle = '#ffe066';
    ctx.fillRect(px + 8, py - 6, 10, 14);
    ctx.strokeStyle = '#cc9900';
    ctx.strokeRect(px + 8, py - 6, 10, 14);
    ctx.fillStyle = '#333';
    ctx.font = '6px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('🎨', px + 13, py + 4);
  } else if (player.heldBase && player.heldTint) {
    ctx.fillStyle = '#88ddaa';
    ctx.fillRect(px + 8, py - 6, 10, 14);
    ctx.strokeStyle = '#44aa66';
    ctx.strokeRect(px + 8, py - 6, 10, 14);
  } else if (player.heldBase) {
    ctx.fillStyle = BASE_COLORS[player.heldBase];
    ctx.fillRect(px + 8, py - 6, 10, 14);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.strokeRect(px + 8, py - 6, 10, 14);
  }
}

function _roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
