const el = id => document.getElementById(id);

export function updateHUD(sm, player) {
  el('score').textContent = sm.score;
  _updateQueuePanel(sm, player);
  _updateRightPanel(sm, player);
}

function _updateQueuePanel(sm, player) {
  // Queue list
  const list = el('queue-list');
  list.innerHTML = '';
  sm.queueTickets.forEach(t => {
    const div = document.createElement('div');
    div.className = 'queue-item';
    div.innerHTML =
      `<span class="qi-name">${t.order.customerName.split(' ').pop()}</span>` +
      `<span class="qi-color">${t.order.colorName}</span>`;
    list.appendChild(div);
  });
  if (sm.queue.length === 0) {
    list.innerHTML = '<div class="queue-empty">No customers</div>';
  }

  // Active tasks across all carry arrays
  const taskEl = el('active-task');
  const allActive = [
    ...(player.cans       || []).map(e => ({ ticketId: e.ticketId, baseType: e.baseType, stage: 'base' })),
    ...(player.sealedCans || []).map(e => ({ ticketId: e.ticketId, stage: 'sealed' })),
    ...(player.mixedCans  || []).map(e => ({ ticketId: e.ticketId, stage: 'deliver' })),
  ];

  if (allActive.length === 0) {
    taskEl.classList.add('hidden');
    return;
  }

  taskEl.classList.remove('hidden');
  taskEl.innerHTML = '<div class="task-label">WORKING</div>';
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

function _updateRightPanel(sm, player) {
  // Tinter status
  const tinterEl = el('tinter-status');
  if (tinterEl) {
    const tm = sm.tintMachine;
    const hasActivity = tm.inputQueue.length > 0 || tm.processing || tm.outputQueue.length > 0;
    if (hasActivity) {
      const proc = tm.processing
        ? `<span class="tint-proc">${Math.ceil(tm.processing.timer)}s</span>`
        : `<span class="tint-idle">—</span>`;
      tinterEl.innerHTML =
        `<span class="tint-in">In:${tm.inputQueue.length}</span> ` +
        `→ ${proc} → ` +
        `<span class="tint-out">Out:${tm.outputQueue.length}</span>`;
    } else {
      tinterEl.innerHTML = '<span class="queue-empty">—</span>';
    }
  }

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

  // Pickup queue
  const pickupList = el('pickup-list');
  pickupList.innerHTML = '';
  sm.pickupTickets.forEach(t => {
    const div = document.createElement('div');
    div.className = 'pickup-item';
    div.textContent = t.order.customerName.split(' ').pop();
    pickupList.appendChild(div);
  });
  if (sm.atPickup.length === 0) {
    pickupList.innerHTML = '<div class="queue-empty">—</div>';
  }
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

const CONTAINER = 640;

export function updateSpeechBubbles(customers) {
  const bubble  = el('speech-bubble');
  const visible = customers.filter(c => c.visible && c.speech && c.speech.state !== 'hidden');

  if (visible.length === 0) {
    bubble.classList.add('hidden');
    return;
  }

  const target = visible.find(c => c.speech.state === 'loading') || visible[0];

  bubble.classList.remove('hidden');
  bubble.classList.toggle('loading', target.speech.state === 'loading');
  el('speech-text').textContent = target.speech.state === 'loading' ? '' : target.speech.text;

  const w    = bubble.offsetWidth;
  const h    = bubble.offsetHeight;
  let left   = target.px - w / 2;
  let top    = target.py - 44 - h;
  left = Math.max(4, Math.min(CONTAINER - w - 4, left));
  top  = Math.max(4, top);
  bubble.style.left = left + 'px';
  bubble.style.top  = top + 'px';
}

export function hideStartScreen() {
  el('start-screen').classList.add('hidden');
}
