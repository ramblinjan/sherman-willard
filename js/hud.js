import { TILE, COLS, DAY_DURATION } from './constants.js';

const el = id => document.getElementById(id);
const CONTAINER = COLS * TILE; // canvas width in px

// Speech bubble cycling state
let _bubbleTarget   = null;
let _bubbleTimer    = 0;
let _bubbleDuration = 3;

export function updateHUD(sm, player, player2 = null) {
  el('score').textContent = sm.score;
  _updateDayBanner(sm);
  _updateQueuePanels(sm, !!player2);
  _updateLeftMirrors(sm, !!player2);
  _updateWorkingBlock(sm, player,  'active-task',    'P1');
  _updateWorkingBlock(sm, player2, 'active-task-p2', 'P2');
  _updateRightPanel(sm);
}

function _updateDayBanner(sm) {
  const progress = Math.min(sm.dayTimer / DAY_DURATION, 1);
  const sun = el('day-sun');
  if (sun) sun.style.left = `calc(${progress * 100}% - 7px)`;
}

function _updateQueuePanels(sm, p2Active) {
  // Build queue HTML once, apply to both panels
  let html = '';
  sm.queueTickets.forEach(t => {
    html +=
      `<div class="queue-item">` +
      `<span class="qi-name">${t.order.customerName.split(' ').pop()} ×${t.order.canCount}</span>` +
      `<span class="qi-color">${t.order.colorName}</span>` +
      `</div>`;
  });
  if (!html) html = '<div class="queue-empty">No customers</div>';

  el('queue-list').innerHTML = html;

  // Right-side queue mirror — shown only when P2 is active
  const qRight = el('queue-right');
  qRight.classList.toggle('hidden', !p2Active);
  if (p2Active) el('queue-list-right').innerHTML = html;
}

function _updateLeftMirrors(sm, p2Active) {
  el('left-mirrors').classList.toggle('hidden', !p2Active);

  // Tinter
  if (p2Active) el('tinter-status-left').innerHTML = _tinterHTML(sm);

  // Shakers
  if (p2Active) {
    const shakerListLeft = el('shaker-list-left');
    shakerListLeft.innerHTML = '';
    ['A', 'B', 'C'].forEach((lbl, i) => {
      const shaker = sm.shakers[i];
      const div = document.createElement('div');
      div.className = 'shaker-row';
      let statusText, statusClass;
      if (shaker.status === 'idle') {
        statusText = '—'; statusClass = 'sh-idle';
      } else if (shaker.status === 'shaking') {
        const ticket = sm.tickets.get(shaker.ticketId);
        const name = ticket ? ticket.order.customerName.split(' ').pop() : '?';
        statusText = `${name} ${Math.ceil(shaker.timer)}s`; statusClass = 'sh-shaking';
      } else {
        const ticket = sm.tickets.get(shaker.ticketId);
        const name = ticket ? ticket.order.customerName.split(' ').pop() : '?';
        statusText = `${name} READY`; statusClass = 'sh-ready';
      }
      div.innerHTML =
        `<span class="sh-label">[${lbl}]</span>` +
        `<span class="sh-status ${statusClass}">${statusText}</span>`;
      shakerListLeft.appendChild(div);
    });
  }

  // Pickup
  if (p2Active) {
    const pickupListLeft = el('pickup-list-left');
    pickupListLeft.innerHTML = '';
    sm.pickupTickets.forEach(t => {
      const div = document.createElement('div');
      div.className = 'pickup-item';
      const name = t.order.customerName.split(' ').pop();
      div.textContent = `${name} ×${t.cansNeeded - t.cansDelivered}`;
      pickupListLeft.appendChild(div);
    });
    if (sm.atPickup.length === 0) {
      pickupListLeft.innerHTML = '<div class="queue-empty">—</div>';
    }
  }
}

function _tinterHTML(sm) {
  const tm = sm.tintMachine;
  const hasActivity = tm.inputQueue.length > 0 || tm.processing || tm.outputQueue.length > 0;
  if (!hasActivity) return '<span class="queue-empty">—</span>';
  const proc = tm.processing
    ? `<span class="tint-proc">${Math.ceil(tm.processing.timer)}s</span>`
    : `<span class="tint-idle">—</span>`;
  return `<span class="tint-in">In:${tm.inputQueue.length}</span> → ${proc} → <span class="tint-out">Out:${tm.outputQueue.length}</span>`;
}

function _updateWorkingBlock(sm, player, elementId, label) {
  const taskEl = el(elementId);
  if (!player) { taskEl.classList.add('hidden'); return; }

  const allActive = [
    ...(player.cans       || []).map(e => ({ ticketId: e.ticketId, baseType: e.baseType, stage: 'base' })),
    ...(player.sealedCans || []).map(e => ({ ticketId: e.ticketId, stage: 'sealed' })),
    ...(player.mixedCans  || []).map(e => ({ ticketId: e.ticketId, stage: 'deliver' })),
  ];

  if (allActive.length === 0) { taskEl.classList.add('hidden'); return; }

  taskEl.classList.remove('hidden');
  taskEl.innerHTML = `<div class="task-label">${label}</div>`;
  for (const item of allActive) {
    const ticket = sm.tickets.get(item.ticketId);
    if (!ticket) continue;
    const name = ticket.order.customerName.split(' ').pop();
    let status;
    if (item.stage === 'base') {
      status = item.baseType ? `${item.baseType} → tinter` : `need ${ticket.order.baseType}`;
    } else if (item.stage === 'sealed') {
      status = 'sealed → shaker';
    } else {
      status = 'delivering';
    }
    const row = document.createElement('div');
    row.className = 'task-row';
    row.innerHTML = `<span class="task-name">${name}</span><span class="task-status">${status}</span>`;
    taskEl.appendChild(row);
  }
}

function _updateRightPanel(sm) {
  // Tinter status (main)
  el('tinter-status').innerHTML = _tinterHTML(sm);

  // Shaker statuses
  const shakerList = el('shaker-list');
  shakerList.innerHTML = '';
  ['A', 'B', 'C'].forEach((lbl, i) => {
    const shaker = sm.shakers[i];
    const div = document.createElement('div');
    div.className = 'shaker-row';

    let statusText, statusClass;
    if (shaker.status === 'idle') {
      statusText  = '—';
      statusClass = 'sh-idle';
    } else if (shaker.status === 'shaking') {
      const ticket = sm.tickets.get(shaker.ticketId);
      const name   = ticket ? ticket.order.customerName.split(' ').pop() : '?';
      statusText  = `${name} ${Math.ceil(shaker.timer)}s`;
      statusClass = 'sh-shaking';
    } else {
      const ticket = sm.tickets.get(shaker.ticketId);
      const name   = ticket ? ticket.order.customerName.split(' ').pop() : '?';
      statusText  = `${name} READY`;
      statusClass = 'sh-ready';
    }

    div.innerHTML =
      `<span class="sh-label">[${lbl}]</span>` +
      `<span class="sh-status ${statusClass}">${statusText}</span>`;
    shakerList.appendChild(div);
  });

  // Pickup queue — show remaining gallons, counting down
  const pickupList = el('pickup-list');
  pickupList.innerHTML = '';
  sm.pickupTickets.forEach(t => {
    const div = document.createElement('div');
    div.className = 'pickup-item';
    const name      = t.order.customerName.split(' ').pop();
    const remaining = t.cansNeeded - t.cansDelivered;
    div.textContent = `${name} ×${remaining}`;
    pickupList.appendChild(div);
  });
  if (sm.atPickup.length === 0) {
    pickupList.innerHTML = '<div class="queue-empty">—</div>';
  }
}

export function showDayEnd(sm) {
  el('day-stat-customers').textContent = `Customers served: ${sm.score}`;
  el('day-stat-gallons').textContent   = `Gallons sold: ${sm.gallonsSold}`;
  el('day-end').classList.remove('hidden');
}

export function hideDayEnd() {
  el('day-end').classList.add('hidden');
}

export function showPrompt(text, showKey = true) {
  const p = el('interact-prompt');
  if (text) {
    p.classList.remove('hidden');
    el('prompt-text').textContent = text;
    el('prompt-key').style.display = showKey ? '' : 'none';
  } else {
    p.classList.add('hidden');
  }
}

export function showCelebration(show) {
  el('celebration').classList.toggle('hidden', !show);
}

export function updateSpeechBubbles(customers, dt = 0) {
  const bubble = el('speech-bubble');
  const valid  = customers.filter(c => c.visible && c.speech?.state === 'shown');

  if (valid.length === 0) {
    bubble.classList.add('hidden');
    bubble.style.opacity = '1';
    _bubbleTarget = null;
    _bubbleTimer  = 0;
    return;
  }

  // If current target is no longer valid, switch to first valid customer
  if (!valid.includes(_bubbleTarget)) {
    _bubbleTarget   = valid[0];
    _bubbleDuration = 2.5 + Math.random() * 2;
    _bubbleTimer    = _bubbleDuration;
  }

  // Advance timer; when expired, rotate to next customer
  _bubbleTimer -= dt;
  if (_bubbleTimer <= 0) {
    const idx       = valid.indexOf(_bubbleTarget);
    _bubbleTarget   = valid[(idx + 1) % valid.length];
    _bubbleDuration = 2.5 + Math.random() * 2;
    _bubbleTimer    = _bubbleDuration;
  }

  // Fade out over the last 40% of display time
  const fadeStart = _bubbleDuration * 0.6;
  const opacity   = _bubbleTimer > fadeStart
    ? 1.0
    : 0.2 + 0.8 * (_bubbleTimer / fadeStart);
  bubble.style.opacity = opacity.toFixed(3);

  const target = _bubbleTarget;
  bubble.classList.remove('hidden');
  bubble.classList.remove('loading');
  el('speech-text').textContent = target.speech.text;

  const w    = bubble.offsetWidth;
  const h    = bubble.offsetHeight;
  let left   = target.px - w / 2;
  let top    = target.py - 44 * (TILE / 32) - h;
  left = Math.max(4, Math.min(CONTAINER - w - 4, left));
  top  = Math.max(4, top);
  bubble.style.left = left + 'px';
  bubble.style.top  = top + 'px';
}

export function hideStartScreen() {
  el('start-screen').classList.add('hidden');
}
