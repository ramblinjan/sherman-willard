export interface MoveDelta { dx: number; dy: number; }

export interface InputHandler {
  getMoveDelta(): MoveDelta;
  consumeInteract(): boolean;
  consumeDash(): boolean;
  clearKeys(): void;
}

// All key matching uses e.code (physical key), never e.key: e.key is
// modifier-sensitive ('w' becomes 'W' while Shift is held), so a key released
// mid-dash would fire keyup under a different name and stay stuck down.
export function createInputHandler(
  upCodes: string[],
  downCodes: string[],
  leftCodes: string[],
  rightCodes: string[],
  interactCodes: string[],
  dashCodes: string[] = [],
): InputHandler {
  const down = new Set<string>();
  let interactPressed = false;
  let dashPressed = false;

  const tracked = new Set([...upCodes, ...downCodes, ...leftCodes, ...rightCodes, ...interactCodes]);

  window.addEventListener('keydown', e => {
    if (dashCodes.includes(e.code) && !e.repeat) dashPressed = true;
    if (!tracked.has(e.code)) return;
    down.add(e.code);
    if (interactCodes.includes(e.code)) {
      interactPressed = true;
      e.preventDefault();
    }
  });

  // Unconditional release — never gated on current modifier state
  window.addEventListener('keyup', e => {
    down.delete(e.code);
  });

  function clearKeys(): void {
    down.clear();
  }

  // Focus loss eats keyup events (alt-tab, dev tools, OS shortcuts) — flush
  // everything rather than leave a phantom key held.
  window.addEventListener('blur', clearKeys);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearKeys();
  });

  function getMoveDelta(): MoveDelta {
    let dx = 0, dy = 0;
    if (upCodes.some(c    => down.has(c))) dy -= 1;
    if (downCodes.some(c  => down.has(c))) dy += 1;
    if (leftCodes.some(c  => down.has(c))) dx -= 1;
    if (rightCodes.some(c => down.has(c))) dx += 1;
    return { dx, dy };
  }

  function consumeInteract(): boolean {
    if (interactPressed) { interactPressed = false; return true; }
    return false;
  }

  function consumeDash(): boolean {
    if (dashPressed) { dashPressed = false; return true; }
    return false;
  }

  return { getMoveDelta, consumeInteract, consumeDash, clearKeys };
}

export const p1Input = createInputHandler(
  ['KeyW'], ['KeyS'], ['KeyA'], ['KeyD'], ['KeyE'], ['ShiftLeft']
);

export const p2Input = createInputHandler(
  ['ArrowUp'], ['ArrowDown'], ['ArrowLeft'], ['ArrowRight'], ['Slash'], ['ShiftRight']
);
