export interface MoveDelta { dx: number; dy: number; }

export interface InputHandler {
  getMoveDelta(): MoveDelta;
  consumeInteract(): boolean;
  consumeDash(): boolean;
}

export function createInputHandler(
  upKeys: string[],
  downKeys: string[],
  leftKeys: string[],
  rightKeys: string[],
  interactKeys: string[],
  dashCodes: string[] = [], // matched against e.code (ShiftLeft vs ShiftRight both report e.key 'Shift')
): InputHandler {
  const keys: Record<string, boolean> = {};
  let interactPressed = false;
  let dashPressed = false;

  const allKeys = new Set([...upKeys, ...downKeys, ...leftKeys, ...rightKeys, ...interactKeys]);

  window.addEventListener('keydown', e => {
    if (dashCodes.includes(e.code) && !e.repeat) dashPressed = true;
    if (!allKeys.has(e.key)) return;
    keys[e.key] = true;
    if (interactKeys.includes(e.key)) {
      interactPressed = true;
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', e => {
    keys[e.key] = false;
  });

  function getMoveDelta(): MoveDelta {
    let dx = 0, dy = 0;
    if (upKeys.some(k    => keys[k])) dy -= 1;
    if (downKeys.some(k  => keys[k])) dy += 1;
    if (leftKeys.some(k  => keys[k])) dx -= 1;
    if (rightKeys.some(k => keys[k])) dx += 1;
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

  return { getMoveDelta, consumeInteract, consumeDash };
}

export const p1Input = createInputHandler(
  ['w', 'W'], ['s', 'S'], ['a', 'A'], ['d', 'D'], ['e', 'E'], ['ShiftLeft']
);

export const p2Input = createInputHandler(
  ['ArrowUp'], ['ArrowDown'], ['ArrowLeft'], ['ArrowRight'], ['/'], ['ShiftRight']
);
