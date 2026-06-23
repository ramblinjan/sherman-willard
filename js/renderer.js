import { TILE, COLS, ROWS, ZONE, TILE_COLORS, BASE_COLORS } from './constants.js';
import { MAP } from './tilemap.js';

// 2-wide shakers at cols 3, 5, 7 (shifted right 2)
const SHAKERS = [
  { col: 3, label: 'A' },
  { col: 5, label: 'B' },
  { col: 7, label: 'C' },
];

let canvas, ctx;

export function initRenderer(c) {
  canvas = c;
  ctx = canvas.getContext('2d');
}

export function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// tintMachine: sm.tintMachine state; elapsed: total elapsed seconds
export function drawTiles(flashZones, shakersState, tintMachine, elapsed) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const zone  = MAP[row][col];
      const x     = col * TILE;
      const y     = row * TILE;
      ctx.fillStyle = TILE_COLORS[zone] ?? '#555';
      ctx.fillRect(x, y, TILE, TILE);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.strokeRect(x, y, TILE, TILE);
    }
  }

  _drawShelfLabels();
  _drawTintingMachine(tintMachine, elapsed);
  _drawCounter();
  _drawShakerMachines(shakersState, elapsed);

  if (flashZones) {
    for (const { zone, alpha } of flashZones) _drawZoneFlash(zone, alpha);
  }

  if (tintMachine && tintMachine.bangTimer > 0) {
    _drawBangOverlay(tintMachine.bangTimer);
  }
}

// ── Shelf labels ──────────────────────────────────────────────────────────

function _drawShelfLabels() {
  _drawShelfBlock(3,  1, 4, 3, 'WHITE BASE', BASE_COLORS.WHITE, '#333');
  _drawShelfBlock(8,  1, 4, 3, 'GRAY BASE',  BASE_COLORS.GRAY,  '#fff');
  _drawShelfBlock(13, 1, 4, 3, 'DEEP BASE',  BASE_COLORS.DEEP,  '#ddd');
}

function _drawShelfBlock(col, row, w, h, label, bg, textColor) {
  const x  = col * TILE + 2;
  const y  = row * TILE + 2;
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

// ── Tinting machine ───────────────────────────────────────────────────────

function _drawTintingMachine(tintState, elapsed) {
  const tm = tintState || { inputQueue: [], processing: null, outputQueue: [], active: false };

  // Machine sits at rows 6-7, cols 10-16 (7 wide × 2 tall), top against the wall at row 5.
  // Flipped: SEAL on left (cols 10-11), body center (cols 12-14), LOAD on right (cols 15-16).
  // Player operates from row 8 below.

  const ROW = 6;

  // SEAL / OUTPUT HAMMER TABLE — cols 10-11 (left)
  {
    const x  = 10 * TILE + 2;
    const y  = ROW * TILE + 2;
    const pw = 2 * TILE - 4;
    const ph = 2 * TILE - 4;

    ctx.fillStyle = '#2a2040';
    _roundRect(x, y, pw, ph, 4);
    ctx.fill();
    ctx.strokeStyle = '#554477';
    ctx.lineWidth = 1.5;
    _roundRect(x, y, pw, ph, 4);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Hammer icon
    const hx = x + pw / 2;
    const hy = y + 8;
    ctx.fillStyle = '#8877aa';
    ctx.fillRect(hx - 10, hy, 20, 7);
    ctx.fillRect(hx - 2,  hy + 7, 4, 14);

    // Sealed cans waiting (up to 3, side by side)
    const count = Math.min(tm.outputQueue.length, 3);
    for (let i = 0; i < count; i++) {
      const cx2 = x + 6 + i * 17;
      ctx.fillStyle = '#8866aa';
      _roundRect(cx2, y + ph - 22, 12, 18, 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      _roundRect(cx2, y + ph - 22, 12, 18, 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#9988cc';
    ctx.font = 'bold 8px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('SEAL', x + pw / 2, y + ph - 2);
  }

  // MACHINE BODY — cols 12-14 (center)
  {
    const x  = 12 * TILE + 2;
    const y  = ROW * TILE + 2;
    const pw = 3 * TILE - 4;
    const ph = 2 * TILE - 4;

    ctx.fillStyle = '#1a1030';
    _roundRect(x, y, pw, ph, 4);
    ctx.fill();
    ctx.strokeStyle = '#332255';
    ctx.lineWidth = 1.5;
    _roundRect(x, y, pw, ph, 4);
    ctx.stroke();
    ctx.lineWidth = 1;

    const cx = x + pw / 2;
    const cy = y + ph / 2 - 4;
    const r  = 18;

    if (tm.processing) {
      const progress = 1 - (tm.processing.timer / tm.processing.total);
      const jitter   = Math.sin((elapsed ?? 0) * 15) * 1.5;

      ctx.fillStyle = '#888';
      _roundRect(cx - 6 + jitter, cy - 9, 12, 18, 2);
      ctx.fill();

      ctx.strokeStyle = '#ffe066';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx + jitter, cy, r, -Math.PI / 2, -Math.PI / 2 + progress * 2 * Math.PI);
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.fillStyle = '#ffe066';
      ctx.font = 'bold 9px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`${Math.ceil(tm.processing.timer)}s`, cx, cy + r + 2);
    } else {
      ctx.strokeStyle = tm.active ? '#55cc88' : '#443366';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.fillStyle = tm.active ? '#55cc88' : '#554477';
      ctx.font = 'bold 9px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tm.active ? 'ON' : '—', cx, cy);
    }

    ctx.fillStyle = '#776699';
    ctx.font = 'bold 8px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('TINTER', x + pw / 2, y + ph - 2);
  }

  // LOAD / INPUT ROLLER RACK — cols 15-16 (right)
  {
    const x  = 15 * TILE + 2;
    const y  = ROW * TILE + 2;
    const pw = 2 * TILE - 4;
    const ph = 2 * TILE - 4;

    ctx.fillStyle = '#2a2040';
    _roundRect(x, y, pw, ph, 4);
    ctx.fill();
    ctx.strokeStyle = '#554477';
    ctx.lineWidth = 1.5;
    _roundRect(x, y, pw, ph, 4);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Vertical roller stripes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    for (let i = 1; i < 4; i++) {
      const rx = x + i * (pw / 4);
      ctx.beginPath();
      ctx.moveTo(rx, y + 4);
      ctx.lineTo(rx, y + ph - 4);
      ctx.stroke();
    }

    // Mini cans queued on the roller
    const count = Math.min(tm.inputQueue.length, 3);
    for (let i = 0; i < count; i++) {
      const cx2 = x + 6 + i * 17;
      ctx.fillStyle = '#999';
      _roundRect(cx2, y + ph / 2 - 9, 12, 18, 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      _roundRect(cx2, y + ph / 2 - 9, 12, 18, 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#9988cc';
    ctx.font = 'bold 8px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('LOAD', x + pw / 2, y + ph - 2);
  }
}

function _drawBangOverlay(bangTimer) {
  const alpha = bangTimer / 0.6;
  // Spread across the full machine (cols 10-16, rows 6-7)
  const machineCenter = (10 + 3.5) * TILE;
  const my = 6 * TILE + TILE; // vertical center

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ff2222';
  ctx.font = 'bold 18px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BANG', machineCenter - 56, my);
  ctx.fillText('BANG', machineCenter,      my);
  ctx.fillText('BANG', machineCenter + 56, my);
  ctx.restore();
}

// ── Shakers ───────────────────────────────────────────────────────────────

function _drawShakerMachines(shakersState, elapsed) {
  SHAKERS.forEach(({ col, label }, idx) => {
    const state = shakersState ? shakersState[idx] : { status: 'idle', timer: 0 };
    const x  = col * TILE + 2;
    const y  = 6 * TILE + 2;
    const pw = 2 * TILE - 4;
    const ph = 2 * TILE - 4;

    ctx.save();

    let offsetX = 0;
    let bgColor, borderColor, textColor, labelText;

    if (state.status === 'shaking') {
      offsetX     = Math.sin((elapsed ?? 0) * 20) * 2.5;
      bgColor     = '#3a5070';
      borderColor = '#ffe066';
      textColor   = '#ffe066';
      labelText   = `${Math.ceil(state.timer)}s`;
    } else if (state.status === 'ready') {
      bgColor     = '#2e5a3e';
      borderColor = '#5fdd8f';
      textColor   = '#5fdd8f';
      labelText   = 'READY';
    } else {
      bgColor     = '#3a5070';
      borderColor = '#6090b0';
      textColor   = '#88bbdd';
      labelText   = `[${label}]`;
    }

    ctx.fillStyle = bgColor;
    _roundRect(x + offsetX, y, pw, ph, 5);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = state.status !== 'idle' ? 2.5 : 1.5;
    _roundRect(x + offsetX, y, pw, ph, 5);
    ctx.stroke();
    ctx.lineWidth = 1;

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    _roundRect(x + offsetX + 6, y + 6, pw - 12, ph - 12, 3);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = `bold ${state.status === 'idle' ? 10 : 9}px Courier New`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, x + offsetX + pw / 2, y + ph / 2);

    ctx.restore();
  });
}

// ── Counter ───────────────────────────────────────────────────────────────

function _drawCounter() {
  ctx.fillStyle = '#5a4a3a';
  ctx.fillRect(0, 12 * TILE, COLS * TILE, TILE);
  ctx.strokeStyle = '#7a6a5a';
  ctx.strokeRect(0, 12 * TILE, COLS * TILE, TILE);

  ctx.fillStyle = '#ffe066';
  ctx.font = 'bold 9px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('REGISTER', 4 * TILE, 12 * TILE + TILE / 2);
  ctx.fillText('PICKUP',   15 * TILE, 12 * TILE + TILE / 2);
}

// ── Zone flash ────────────────────────────────────────────────────────────

function _drawZoneFlash(zone, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ff3333';

  const regions = {
    [ZONE.SHELF_WHITE]: { col: 3,  row: 1, w: 4, h: 3 },
    [ZONE.SHELF_GRAY]:  { col: 8,  row: 1, w: 4, h: 3 },
    [ZONE.SHELF_DEEP]:  { col: 13, row: 1, w: 4, h: 3 },
  };
  const r = regions[zone];
  if (r) ctx.fillRect(r.col * TILE, r.row * TILE, r.w * TILE, r.h * TILE);
  ctx.restore();
}

// ── Customers ─────────────────────────────────────────────────────────────

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
    const name = customer.currentOrder.customerName.split(' ').pop();
    ctx.font = '9px Courier New';
    const tw = ctx.measureText(name).width + 6;
    ctx.fillStyle = 'rgba(10,10,20,0.75)';
    ctx.fillRect(px - tw / 2, py - 34, tw, 13);
    ctx.fillStyle = '#ffe';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(name, px, py - 32);
  }
}

// ── Player ────────────────────────────────────────────────────────────────

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

  // Stacked mini-badges for held items
  const items = [
    ...(player.cans       || []).map(e => ({ color: e.baseType ? BASE_COLORS[e.baseType] : '#aaa' })),
    ...(player.sealedCans || []).map(() => ({ color: '#aa66dd' })),
    ...(player.mixedCans  || []).map(() => ({ color: '#ffe066' })),
  ];

  items.forEach((item, i) => {
    const bx = px + 8;
    const by = py - 8 + i * 8;
    ctx.fillStyle = item.color;
    ctx.fillRect(bx, by, 10, 6);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.strokeRect(bx, by, 10, 6);
  });
}

// ── Util ──────────────────────────────────────────────────────────────────

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
