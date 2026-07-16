import { p1Input } from './input';

// Touch controls: virtual joystick (lower-left) + interact/dash buttons
// (lower-right). Everything drives p1Input through the same seams the
// keyboard uses, so the game loop is untouched. Touch play is P1-only.

export function isTouchDevice(): boolean {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    location.search.includes('touch') // force flag for desktop/preview testing
  );
}

const JOY_RADIUS = 52;   // px from center to full deflection
const DEAD_ZONE  = 0.22; // fraction of radius before movement registers

export function initTouchControls(): void {
  document.body.classList.add('touch-mode');

  const root = document.createElement('div');
  root.id = 'touch-controls';
  root.innerHTML =
    '<div id="joystick"><div id="joystick-thumb"></div></div>' +
    '<div id="touch-buttons">' +
    '<button id="btn-dash" aria-label="Dash">⚡</button>' +
    '<button id="btn-interact" aria-label="Interact">✋</button>' +
    '</div>';
  document.body.appendChild(root);
  root.addEventListener('contextmenu', e => e.preventDefault());

  // ── Joystick ───────────────────────────────────────────────────────────────
  const joy   = document.getElementById('joystick')!;
  const thumb = document.getElementById('joystick-thumb')!;
  let activePointer: number | null = null;

  function updateThumb(dx: number, dy: number): void {
    thumb.style.transform = `translate(${dx * JOY_RADIUS}px, ${dy * JOY_RADIUS}px)`;
  }

  function vectorFrom(e: PointerEvent): { dx: number; dy: number } {
    const rect = joy.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = (e.clientX - cx) / JOY_RADIUS;
    let dy = (e.clientY - cy) / JOY_RADIUS;
    const mag = Math.hypot(dx, dy);
    if (mag > 1) { dx /= mag; dy /= mag; }
    if (mag < DEAD_ZONE) { dx = 0; dy = 0; }
    return { dx, dy };
  }

  joy.addEventListener('pointerdown', e => {
    activePointer = e.pointerId;
    joy.setPointerCapture(e.pointerId);
    const { dx, dy } = vectorFrom(e);
    p1Input.setAnalogMove(dx, dy);
    updateThumb(dx, dy);
    e.preventDefault();
  });

  joy.addEventListener('pointermove', e => {
    if (e.pointerId !== activePointer) return;
    const { dx, dy } = vectorFrom(e);
    p1Input.setAnalogMove(dx, dy);
    updateThumb(dx, dy);
  });

  function releaseJoy(e: PointerEvent): void {
    if (e.pointerId !== activePointer) return;
    activePointer = null;
    p1Input.setAnalogMove(0, 0);
    updateThumb(0, 0);
  }
  joy.addEventListener('pointerup', releaseJoy);
  joy.addEventListener('pointercancel', releaseJoy);

  // ── Buttons ────────────────────────────────────────────────────────────────
  function bindButton(id: string, press: () => void): void {
    const btn = document.getElementById(id)!;
    btn.addEventListener('pointerdown', e => {
      press();
      btn.classList.add('pressed');
      e.preventDefault();
    });
    const clear = () => btn.classList.remove('pressed');
    btn.addEventListener('pointerup', clear);
    btn.addEventListener('pointercancel', clear);
    btn.addEventListener('pointerleave', clear);
  }

  bindButton('btn-interact', () => p1Input.pressInteract());
  bindButton('btn-dash',     () => p1Input.pressDash());
}
