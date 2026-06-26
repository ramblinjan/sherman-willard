import { TILE, COLS, ROWS, ZONE, TILE_COLORS, BASE_COLORS } from './constants';
import { currentLevel } from './level';

const S = TILE / 32; // scale factor relative to original 32px tile size

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
  const grid = currentLevel().grid;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const zone  = grid[row][col];
      const x     = col * TILE;
      const y     = row * TILE;
      ctx.fillStyle = TILE_COLORS[zone] ?? '#555';
      ctx.fillRect(x, y, TILE, TILE);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.strokeRect(x, y, TILE, TILE);
    }
  }

  _drawInteractRugs();
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

// ── Zone colors (used for floor mats and player glow) ─────────────────────

const ZONE_COLORS = {
  [ZONE.REGISTER]:          [255, 215,  50],
  [ZONE.PICKUP]:            [ 50, 210, 100],
  [ZONE.SHELF_WHITE]:       [255, 200, 110],
  [ZONE.SHELF_GRAY]:        [200, 200, 200],
  [ZONE.SHELF_DEEP]:        [160, 160, 230],
  [ZONE.SHAKER_A]:          [100, 170, 255],
  [ZONE.SHAKER_B]:          [100, 170, 255],
  [ZONE.SHAKER_C]:          [100, 170, 255],
  [ZONE.TINT_INPUT]:        [190, 120, 255],
  [ZONE.TINT_MACHINE_BODY]: [190, 120, 255],
  [ZONE.TINT_OUTPUT]:       [190, 120, 255],
};


function _drawInteractRugs() {
  for (const { col, row, w, h, zone } of currentLevel().rugs) {
    const rgb = ZONE_COLORS[zone];
    if (!rgb) continue;
    const x = col * TILE, y = row * TILE;
    const rw = w * TILE,  rh = h * TILE;
    const [r, g, b] = rgb;
    const pad = 2;

    ctx.save();

    // Light gray fill with subtle zone color tint
    const rf = Math.round(118 + r * 0.06);
    const gf = Math.round(113 + g * 0.06);
    const bf = Math.round(108 + b * 0.07);
    ctx.fillStyle = `rgba(${rf},${gf},${bf},0.82)`;
    ctx.fillRect(x + pad, y + pad, rw - pad*2, rh - pad*2);

    // Pile texture: grid of darker dots so texture is clearly visible
    const dotSz = Math.max(1, Math.round(1.2 * S));
    const step  = Math.round(4.5 * S);
    ctx.fillStyle = `rgba(${Math.round(rf*0.60)},${Math.round(gf*0.60)},${Math.round(bf*0.60)},0.70)`;
    for (let px = x + step; px < x + rw - step * 0.5; px += step) {
      for (let py2 = y + step; py2 < y + rh - step * 0.5; py2 += step) {
        ctx.fillRect(px, py2, dotSz, dotSz);
      }
    }

    // Border/shadow color (notably darker than fill)
    const rb = Math.round(rf * 0.46);
    const gb2 = Math.round(gf * 0.46);
    const bbb = Math.round(bf * 0.46);

    // Fuzzy outer border with shadowBlur for soft carpet-edge look
    ctx.shadowColor = `rgba(${rb},${gb2},${bbb},0.55)`;
    ctx.shadowBlur  = 3 * S;
    ctx.strokeStyle = `rgba(${rb},${gb2},${bbb},0.92)`;
    ctx.lineWidth   = 2;
    ctx.strokeRect(x + pad, y + pad, rw - pad*2, rh - pad*2);
    ctx.shadowBlur  = 0;

    // Inner decorative border line
    const inset = Math.round(3.5 * S);
    ctx.strokeStyle = `rgba(${rb},${gb2},${bbb},0.45)`;
    ctx.lineWidth   = 1;
    ctx.strokeRect(x + pad + inset, y + pad + inset,
                   rw - pad*2 - inset*2, rh - pad*2 - inset*2);

    ctx.lineWidth = 1;
    ctx.restore();
  }
}

// ── Shelf labels ──────────────────────────────────────────────────────────

function _drawShelfLabels() {
  _drawShelfBlock(3,  1, 4, 3, 'WHITE BASE', BASE_COLORS.WHITE, '#333');
  _drawShelfBlock(8,  1, 4, 3, 'GRAY BASE',  BASE_COLORS.GRAY,  '#fff');
  _drawShelfBlock(13, 1, 4, 3, 'DEEP BASE',  BASE_COLORS.DEEP,  '#ddd');
}

function _drawShelfBlock(col, row, w, h, label, bg, textColor) {
  const x  = col * TILE + 2 * S;
  const y  = row * TILE + 2 * S;
  const pw = w * TILE - 4 * S;
  const ph = h * TILE - 4 * S;

  ctx.fillStyle = bg;
  _roundRect(x, y, pw, ph, 4 * S);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1.5;
  _roundRect(x, y, pw, ph, 4 * S);
  ctx.stroke();
  ctx.lineWidth = 1;

  const canW = 14 * S, canH = 18 * S;
  const cansPerRow = Math.floor(pw / (canW + 6 * S));
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < cansPerRow; c++) {
      const cx = x + 8 * S + c * (canW + 6 * S);
      const cy = y + 8 * S + r * (canH + 6 * S);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      _roundRect(cx, cy, canW, canH, 2 * S);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      _roundRect(cx, cy, canW, canH, 2 * S);
      ctx.stroke();
    }
  }

  ctx.fillStyle = textColor;
  ctx.font = `bold ${Math.round(10 * S)}px Courier New`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(label, x + pw / 2, y + ph - 4 * S);
}

// ── Tinting machine ───────────────────────────────────────────────────────

function _drawTintingMachine(tintState, elapsed) {
  const tm = tintState || { inputQueue: [], processing: null, outputQueue: [], active: false };

  const ROW = 6;

  // SEAL / OUTPUT HAMMER TABLE — cols 10-11 (left)
  {
    const x  = 10 * TILE + 2 * S;
    const y  = ROW * TILE + 2 * S;
    const pw = 2 * TILE - 4 * S;
    const ph = 2 * TILE - 4 * S;

    ctx.fillStyle = '#2a2040';
    _roundRect(x, y, pw, ph, 4 * S);
    ctx.fill();
    ctx.strokeStyle = '#554477';
    ctx.lineWidth = 1.5;
    _roundRect(x, y, pw, ph, 4 * S);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Hammer icon
    const hx = x + pw / 2;
    const hy = y + 8 * S;
    ctx.fillStyle = '#8877aa';
    ctx.fillRect(hx - 10 * S, hy, 20 * S, 7 * S);
    ctx.fillRect(hx - 2 * S,  hy + 7 * S, 4 * S, 14 * S);

    // Sealed cans waiting (up to 3, side by side)
    const count = Math.min(tm.outputQueue.length, 3);
    for (let i = 0; i < count; i++) {
      const cx2 = x + 6 * S + i * 17 * S;
      ctx.fillStyle = '#8866aa';
      _roundRect(cx2, y + ph - 22 * S, 12 * S, 18 * S, 2 * S);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      _roundRect(cx2, y + ph - 22 * S, 12 * S, 18 * S, 2 * S);
      ctx.stroke();
    }

    ctx.fillStyle = '#9988cc';
    ctx.font = `bold ${Math.round(8 * S)}px Courier New`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('SEAL', x + pw / 2, y + ph - 2 * S);
  }

  // MACHINE BODY — cols 12-14 (center)
  {
    const x  = 12 * TILE + 2 * S;
    const y  = ROW * TILE + 2 * S;
    const pw = 3 * TILE - 4 * S;
    const ph = 2 * TILE - 4 * S;

    ctx.fillStyle = '#1a1030';
    _roundRect(x, y, pw, ph, 4 * S);
    ctx.fill();
    ctx.strokeStyle = '#332255';
    ctx.lineWidth = 1.5;
    _roundRect(x, y, pw, ph, 4 * S);
    ctx.stroke();
    ctx.lineWidth = 1;

    const cx = x + pw / 2;
    const cy = y + ph / 2 - 4 * S;
    const r  = 18 * S;

    if (tm.processing) {
      const progress = 1 - (tm.processing.timer / tm.processing.total);
      const jitter   = Math.sin((elapsed ?? 0) * 15) * 1.5 * S;

      ctx.fillStyle = '#888';
      _roundRect(cx - 6 * S + jitter, cy - 9 * S, 12 * S, 18 * S, 2 * S);
      ctx.fill();

      ctx.strokeStyle = '#ffe066';
      ctx.lineWidth = 3 * S;
      ctx.beginPath();
      ctx.arc(cx + jitter, cy, r, -Math.PI / 2, -Math.PI / 2 + progress * 2 * Math.PI);
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.fillStyle = '#ffe066';
      ctx.font = `bold ${Math.round(9 * S)}px Courier New`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`${Math.ceil(tm.processing.timer)}s`, cx, cy + r + 2 * S);
    } else {
      ctx.strokeStyle = tm.active ? '#55cc88' : '#443366';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.fillStyle = tm.active ? '#55cc88' : '#554477';
      ctx.font = `bold ${Math.round(9 * S)}px Courier New`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tm.active ? 'ON' : '—', cx, cy);
    }

    ctx.fillStyle = '#776699';
    ctx.font = `bold ${Math.round(8 * S)}px Courier New`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('TINTER', x + pw / 2, y + ph - 2 * S);
  }

  // LOAD / INPUT ROLLER RACK — cols 15-16 (right)
  {
    const x  = 15 * TILE + 2 * S;
    const y  = ROW * TILE + 2 * S;
    const pw = 2 * TILE - 4 * S;
    const ph = 2 * TILE - 4 * S;

    ctx.fillStyle = '#2a2040';
    _roundRect(x, y, pw, ph, 4 * S);
    ctx.fill();
    ctx.strokeStyle = '#554477';
    ctx.lineWidth = 1.5;
    _roundRect(x, y, pw, ph, 4 * S);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Vertical roller stripes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    for (let i = 1; i < 4; i++) {
      const rx = x + i * (pw / 4);
      ctx.beginPath();
      ctx.moveTo(rx, y + 4 * S);
      ctx.lineTo(rx, y + ph - 4 * S);
      ctx.stroke();
    }

    // Mini cans queued on the roller
    const count = Math.min(tm.inputQueue.length, 3);
    for (let i = 0; i < count; i++) {
      const cx2 = x + 6 * S + i * 17 * S;
      ctx.fillStyle = '#999';
      _roundRect(cx2, y + ph / 2 - 9 * S, 12 * S, 18 * S, 2 * S);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      _roundRect(cx2, y + ph / 2 - 9 * S, 12 * S, 18 * S, 2 * S);
      ctx.stroke();
    }

    ctx.fillStyle = '#9988cc';
    ctx.font = `bold ${Math.round(8 * S)}px Courier New`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('LOAD', x + pw / 2, y + ph - 2 * S);
  }
}

function _drawBangOverlay(bangTimer) {
  const alpha = bangTimer / 0.6;
  const machineCenter = (10 + 3.5) * TILE;
  const my = 6 * TILE + TILE;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ff2222';
  ctx.font = `bold ${Math.round(18 * S)}px Courier New`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BANG', machineCenter - 56 * S, my);
  ctx.fillText('BANG', machineCenter,           my);
  ctx.fillText('BANG', machineCenter + 56 * S,  my);
  ctx.restore();
}

// ── Shakers ───────────────────────────────────────────────────────────────

function _drawShakerMachines(shakersState, elapsed) {
  SHAKERS.forEach(({ col, label }, idx) => {
    const state = shakersState ? shakersState[idx] : { status: 'idle', timer: 0 };
    const x  = col * TILE + 2 * S;
    const y  = 6 * TILE + 2 * S;
    const pw = 2 * TILE - 4 * S;
    const ph = 2 * TILE - 4 * S;

    ctx.save();

    let offsetX = 0;
    let bgColor, borderColor, textColor, labelText;

    if (state.status === 'shaking') {
      offsetX     = Math.sin((elapsed ?? 0) * 20) * 2.5 * S;
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
    _roundRect(x + offsetX, y, pw, ph, 5 * S);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = state.status !== 'idle' ? 2.5 : 1.5;
    _roundRect(x + offsetX, y, pw, ph, 5 * S);
    ctx.stroke();
    ctx.lineWidth = 1;

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    _roundRect(x + offsetX + 6 * S, y + 6 * S, pw - 12 * S, ph - 12 * S, 3 * S);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round((state.status === 'idle' ? 10 : 9) * S)}px Courier New`;
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
  ctx.font = `bold ${Math.round(9 * S)}px Courier New`;
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

export function drawCustomers(customers, customerRemaining = new Map()) {
  for (const customer of customers) {
    if (!customer.visible) continue;
    _drawOneCustomer(customer, customerRemaining.get(customer));
  }
}

function _drawOneCustomer(customer, remaining) {
  const px = customer.px;
  const py = customer.py;

  ctx.fillStyle = '#ee8833';
  ctx.fillRect(px - 10 * S, py - 14 * S, 20 * S, 24 * S);

  ctx.fillStyle = '#ffddbb';
  ctx.beginPath();
  ctx.arc(px, py - 18 * S, 8 * S, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#cc9966';
  ctx.lineWidth = 1;
  ctx.stroke();

  if (customer.state === 'WAITING' && customer.currentOrder) {
    const lastName = customer.currentOrder.customerName.split(' ').pop();
    const canCount = remaining ?? customer.currentOrder.canCount;
    const label    = `${lastName} ×${canCount}`;
    ctx.font = `${Math.round(9 * S)}px Courier New`;
    const tw = ctx.measureText(label).width + 6 * S;
    ctx.fillStyle = 'rgba(10,10,20,0.75)';
    ctx.fillRect(px - tw / 2, py - 34 * S, tw, 13 * S);
    ctx.fillStyle = '#ffe';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, px, py - 32 * S);
  }
}

// ── Player ────────────────────────────────────────────────────────────────

export function drawPlayer(player, bodyColor = '#3399ee', elapsed = 0) {
  const px = player.px;
  const py = player.py;

  ctx.save();

  ctx.fillStyle = bodyColor;
  ctx.fillRect(px - 10 * S, py - 14 * S, 20 * S, 24 * S);

  ctx.fillStyle = '#ffcc99';
  ctx.beginPath();
  ctx.arc(px, py - 18 * S, 8 * S, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#cc9966';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Stacked mini-badges for held items, colored by pipeline stage
  const items = (player.held || []).map(e => {
    if (e.stage === 'sealed') return { color: '#aa66dd' };
    if (e.stage === 'mixed')  return { color: '#ffe066' };
    return { color: e.baseType ? BASE_COLORS[e.baseType] : '#aaa' }; // empty / based
  });

  items.forEach((item, i) => {
    const bx = px + 8 * S;
    const by = py - 8 * S + i * 8 * S;
    ctx.fillStyle = item.color;
    ctx.fillRect(bx, by, 10 * S, 6 * S);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.strokeRect(bx, by, 10 * S, 6 * S);
  });

  // Action badge above head only when storemanager confirmed a valid action exists
  const nearZone = player.activeZone;
  if (nearZone) {
    const rgb = ZONE_COLORS[nearZone];
    if (rgb) _drawActionBadge(px, py - 34 * S, nearZone, rgb);
  }

  ctx.restore();
}

function _drawActionBadge(cx, cy, zone, rgb) {
  const hw = 7 * S, hh = 7 * S;

  // Background rounded rect
  ctx.fillStyle = 'rgba(20,20,30,0.88)';
  _roundRect(cx - hw, cy - hh, hw * 2, hh * 2, 3 * S);
  ctx.fill();
  ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.9)`;
  ctx.lineWidth   = 1.5;
  _roundRect(cx - hw, cy - hh, hw * 2, hh * 2, 3 * S);
  ctx.stroke();

  // Icon (white, centered)
  ctx.fillStyle   = '#fff';
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 1.2 * S;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  if (zone === ZONE.REGISTER) {
    // Clipboard: rect outline + 3 fill lines
    ctx.strokeRect(cx - 2.5 * S, cy - 4 * S, 5 * S, 8 * S);
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(cx - 1.5 * S, cy - 2 * S + i * 2.5 * S, 3 * S, 0.8 * S);
    }

  } else if (zone === ZONE.SHELF_WHITE || zone === ZONE.SHELF_GRAY || zone === ZONE.SHELF_DEEP) {
    // Paint can: rect body + handle arc on top
    ctx.fillRect(cx - 2.5 * S, cy - 0.5 * S, 5 * S, 5 * S);
    ctx.strokeRect(cx - 2.5 * S, cy - 0.5 * S, 5 * S, 5 * S);
    ctx.strokeRect(cx - 3 * S, cy - 1.5 * S, 6 * S, 1.5 * S); // rim
    ctx.beginPath();
    ctx.arc(cx, cy - 1 * S, 2 * S, Math.PI, 0);
    ctx.stroke(); // handle

  } else if (zone === ZONE.TINT_INPUT) {
    // Arrow → then box
    ctx.strokeRect(cx, cy - 3 * S, 4 * S, 6 * S);
    ctx.beginPath();
    ctx.moveTo(cx - 5 * S, cy);
    ctx.lineTo(cx,          cy);
    ctx.moveTo(cx - 2.5 * S, cy - 2 * S);
    ctx.lineTo(cx,            cy);
    ctx.lineTo(cx - 2.5 * S, cy + 2 * S);
    ctx.stroke();

  } else if (zone === ZONE.TINT_MACHINE_BODY) {
    // Gear: circle + 4 teeth nubs
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * S, 0, Math.PI * 2);
    ctx.stroke();
    [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([dx, dy]) => {
      ctx.fillRect(cx + dx * 3.5 * S - 0.9 * S, cy + dy * 3.5 * S - 0.9 * S, 1.8 * S, 1.8 * S);
    });

  } else if (zone === ZONE.TINT_OUTPUT) {
    // Box then arrow →
    ctx.strokeRect(cx - 4 * S, cy - 3 * S, 4 * S, 6 * S);
    ctx.beginPath();
    ctx.moveTo(cx,           cy);
    ctx.lineTo(cx + 5 * S,   cy);
    ctx.moveTo(cx + 2.5 * S, cy - 2 * S);
    ctx.lineTo(cx + 5 * S,   cy);
    ctx.lineTo(cx + 2.5 * S, cy + 2 * S);
    ctx.stroke();

  } else if (zone === ZONE.SHAKER_A || zone === ZONE.SHAKER_B || zone === ZONE.SHAKER_C) {
    // Two zigzag lines
    [-1.8 * S, 1.8 * S].forEach(dy => {
      ctx.beginPath();
      ctx.moveTo(cx - 5 * S,   cy + dy);
      ctx.lineTo(cx - 1.5 * S, cy + dy - 2.2 * S);
      ctx.lineTo(cx + 1.5 * S, cy + dy + 2.2 * S);
      ctx.lineTo(cx + 5 * S,   cy + dy);
      ctx.stroke();
    });

  } else if (zone === ZONE.PICKUP) {
    // Checkmark in circle
    ctx.beginPath();
    ctx.arc(cx, cy, 4 * S, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 2.5 * S, cy + 0.5 * S);
    ctx.lineTo(cx - 0.5 * S, cy + 2.5 * S);
    ctx.lineTo(cx + 3 * S,   cy - 2.5 * S);
    ctx.stroke();
  }

  ctx.lineWidth = 1;
  ctx.lineCap   = 'butt';
  ctx.lineJoin  = 'miter';
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
