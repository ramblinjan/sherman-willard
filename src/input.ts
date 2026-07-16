export interface MoveDelta { dx: number; dy: number; }

export interface InputHandler {
  getMoveDelta(): MoveDelta;
  consumeInteract(): boolean;
  consumeDash(): boolean;
  clearKeys(): void;
  // Touch entry points — feed the same state the keyboard handlers set
  setAnalogMove(dx: number, dy: number): void;
  pressInteract(): void;
  pressDash(): void;
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
  let analogX = 0;
  let analogY = 0;

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
    analogX = 0;
    analogY = 0;
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
    // Keyboard wins; otherwise fall back to the analog (touch) vector
    if (dx === 0 && dy === 0 && (analogX !== 0 || analogY !== 0)) {
      return { dx: analogX, dy: analogY };
    }
    return { dx, dy };
  }

  function setAnalogMove(x: number, y: number): void {
    analogX = Math.max(-1, Math.min(1, x));
    analogY = Math.max(-1, Math.min(1, y));
  }

  function pressInteract(): void { interactPressed = true; }
  function pressDash(): void     { dashPressed = true; }

  function consumeInteract(): boolean {
    if (interactPressed) { interactPressed = false; return true; }
    return false;
  }

  function consumeDash(): boolean {
    if (dashPressed) { dashPressed = false; return true; }
    return false;
  }

  return { getMoveDelta, consumeInteract, consumeDash, clearKeys, setAnalogMove, pressInteract, pressDash };
}

export const p1Input = createInputHandler(
  ['KeyW'], ['KeyS'], ['KeyA'], ['KeyD'], ['KeyE'], ['ShiftLeft']
);

export const p2Input = createInputHandler(
  ['ArrowUp'], ['ArrowDown'], ['ArrowLeft'], ['ArrowRight'], ['Slash'], ['ShiftRight']
);
