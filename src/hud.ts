import { TILE, COLS, DAY_DURATION } from './constants';
import type { BaseType } from './types';
import type { StoreManager } from './storemanager';
import type { Player } from './player';
import type { Customer } from './customer';

const el = (id: string): HTMLElement => document.getElementById(id)!;
const CONTAINER = COLS * TILE; // canvas width in px

// Two independent speech bubble groups: queue (register line) and pickup
type BubbleKey = 'queue' | 'pickup';
interface BubbleState {
  target: Customer | null;
  timer: number;
  duration: number;
  currentText: string;
}
const _bubbleState: Record<BubbleKey, BubbleState> = {
  queue:  { target: null, timer: 0, duration: 12, currentText: '' },
  pickup: { target: null, timer: 0, duration: 12, currentText: '' },
};
// customer → { reqId, lineIndex } — tracks how many lines shown this visit (max 3)
const _spokenMap = new Map<Customer, { reqId: number; lineIndex: number }>();

export function updateHUD(sm: StoreManager, player: Player, player2: Player | null = null): void {
  el('score').textContent = String(sm.score);
  _updateDayBanner(sm);
  _updateQueuePanels(sm, !!player2);
  _updateLeftMirrors(sm, !!player2);
  _updateWorkingBlock(sm, player,  'active-task',    'P1');
  _updateWorkingBlock(sm, player2, 'active-task-p2', 'P2');
  _updateRightPanel(sm);
}

function _updateDayBanner(sm: StoreManager): void {
  const progress = Math.min(sm.dayTimer / DAY_DURATION, 1);
  const sun = el('day-sun');
  if (sun) sun.style.left = `calc(${progress * 100}% - 7px)`;
}

function _updateQueuePanels(sm: StoreManager, p2Active: boolean): void {
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

function _updateLeftMirrors(sm: StoreManager, p2Active: boolean): void {
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
      let statusText: string, statusClass: string;
      if (shaker.status === 'idle') {
        statusText = '—'; statusClass = 'sh-idle';
      } else if (shaker.status === 'shaking') {
        const ticket = sm.tickets.get(shaker.ticketId!);
        const name = ticket ? ticket.order.customerName.split(' ').pop() : '?';
        statusText = `${name} ${Math.ceil(shaker.timer)}s`; statusClass = 'sh-shaking';
      } else {
        const ticket = sm.tickets.get(shaker.ticketId!);
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

function _tinterHTML(sm: StoreManager): string {
  const tm = sm.tintMachine;
  const hasActivity = tm.inputQueue.length > 0 || tm.processing || tm.outputQueue.length > 0;
  if (!hasActivity) return '<span class="queue-empty">—</span>';
  const proc = tm.processing
    ? `<span class="tint-proc">${Math.ceil(tm.processing.timer)}s</span>`
    : `<span class="tint-idle">—</span>`;
  return `<span class="tint-in">In:${tm.inputQueue.length}</span> → ${proc} → <span class="tint-out">Out:${tm.outputQueue.length}</span>`;
}

interface ActiveItem { ticketId: number; baseType?: BaseType | null; stage: string; }

function _updateWorkingBlock(sm: StoreManager, player: Player | null, elementId: string, label: string): void {
  const taskEl = el(elementId);
  if (!player) { taskEl.classList.add('hidden'); return; }

  const allActive: ActiveItem[] = player.held.map(e => ({
    ticketId: e.ticketId, baseType: e.baseType, stage: e.stage,
  }));

  if (allActive.length === 0) { taskEl.classList.add('hidden'); return; }

  taskEl.classList.remove('hidden');
  taskEl.innerHTML = `<div class="task-label">${label}</div>`;
  for (const item of allActive) {
    const ticket = sm.tickets.get(item.ticketId);
    if (!ticket) continue;
    const name = ticket.order.customerName.split(' ').pop();
    let status: string;
    if (item.stage === 'empty' || item.stage === 'based') {
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

function _updateRightPanel(sm: StoreManager): void {
  // Tinter status (main)
  el('tinter-status').innerHTML = _tinterHTML(sm);

  // Shaker statuses
  const shakerList = el('shaker-list');
  shakerList.innerHTML = '';
  ['A', 'B', 'C'].forEach((lbl, i) => {
    const shaker = sm.shakers[i];
    const div = document.createElement('div');
    div.className = 'shaker-row';

    let statusText: string, statusClass: string;
    if (shaker.status === 'idle') {
      statusText  = '—';
      statusClass = 'sh-idle';
    } else if (shaker.status === 'shaking') {
      const ticket = sm.tickets.get(shaker.ticketId!);
      const name   = ticket ? ticket.order.customerName.split(' ').pop() : '?';
      statusText  = `${name} ${Math.ceil(shaker.timer)}s`;
      statusClass = 'sh-shaking';
    } else {
      const ticket = sm.tickets.get(shaker.ticketId!);
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

export function showDayEnd(sm: StoreManager): void {
  el('day-stat-customers').textContent = `Customers served: ${sm.score}`;
  el('day-stat-gallons').textContent   = `Gallons sold: ${sm.gallonsSold}`;
  el('day-end').classList.remove('hidden');
}

export function hideDayEnd(): void {
  el('day-end').classList.add('hidden');
}

export function showPrompt(text: string | null, showKey = true): void {
  const p = el('interact-prompt');
  if (text) {
    p.classList.remove('hidden');
    el('prompt-text').textContent = text;
    el('prompt-key').style.display = showKey ? '' : 'none';
  } else {
    p.classList.add('hidden');
  }
}

export function showCelebration(show: boolean): void {
  el('celebration').classList.toggle('hidden', !show);
}

export function updateSpeechBubbles(queueCustomers: Customer[], pickupCustomers: Customer[], dt = 0): void {
  _tickBubble(el('speech-bubble'),   el('speech-text'),   queueCustomers,  dt, 'queue');
  _tickBubble(el('speech-bubble-2'), el('speech-text-2'), pickupCustomers, dt, 'pickup');
}

function _tickBubble(bubble: HTMLElement, textEl: HTMLElement, customers: Customer[], dt: number, key: BubbleKey): void {
  const state = _bubbleState[key];

  const targetValid = state.target
    && state.target.visible
    && state.target.speech?.state === 'shown'
    && state.timer > 0;

  if (!targetValid) {
    state.target = null;
    state.timer  = 0;

    // Find a customer who still has unshown lines this visit
    const candidate = customers.find(c => {
      if (!c?.visible || c.speech?.state !== 'shown') return false;
      const entry = _spokenMap.get(c);
      if (!entry || entry.reqId !== c.reqId) return true;
      return entry.lineIndex < 3;
    });

    if (candidate) {
      const entry     = _spokenMap.get(candidate);
      const lineIndex = (!entry || entry.reqId !== candidate.reqId) ? 0 : entry.lineIndex;
      const rawLine   = candidate.lines?.[lineIndex] ?? '';
      const color     = candidate.currentOrder?.colorName ?? '';

      state.target      = candidate;
      state.duration    = 10 + Math.random() * 5;
      state.timer       = state.duration;
      state.currentText = rawLine.replace('{color}', color);

      _spokenMap.set(candidate, { reqId: candidate.reqId, lineIndex: lineIndex + 1 });
    }
  }

  if (!state.target) {
    bubble.classList.add('hidden');
    bubble.style.opacity = '1';
    return;
  }

  state.timer -= dt;
  if (state.timer <= 0) {
    state.target = null;
    bubble.classList.add('hidden');
    bubble.style.opacity = '1';
    return;
  }

  const fadeStart = state.duration * 0.6;
  const opacity   = state.timer > fadeStart
    ? 1.0
    : 0.2 + 0.8 * (state.timer / fadeStart);
  bubble.style.opacity = opacity.toFixed(3);

  bubble.classList.remove('hidden');
  textEl.textContent = state.currentText;

  const w    = bubble.offsetWidth;
  const h    = bubble.offsetHeight;
  let left   = state.target.px - w / 2;
  let top    = state.target.py - 44 * (TILE / 32) - h;
  left = Math.max(4, Math.min(CONTAINER - w - 4, left));
  top  = Math.max(4, top);
  bubble.style.left = left + 'px';
  bubble.style.top  = top + 'px';
}

export function hideStartScreen(): void {
  el('start-screen').classList.add('hidden');
}
