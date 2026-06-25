export interface MoveDelta { dx: number; dy: number; }

export interface InputHandler {
  getMoveDelta(): MoveDelta;
  consumeInteract(): boolean;
}

export function createInputHandler(
  upKeys: string[],
  downKeys: string[],
  leftKeys: string[],
  rightKeys: string[],
  interactKeys: string[],
): InputHandler {
  const keys: Record<string, boolean> = {};
  let interactPressed = false;

  const allKeys = new Set([...upKeys, ...downKeys, ...leftKeys, ...rightKeys, ...interactKeys]);

  window.addEventListener('keydown', e => {
    if (!allKeys.has(e.key)) return;
    keys[e.key] = true;
    if (interactKeys.includes(e.key)) interactPressed = true;
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

  return { getMoveDelta, consumeInteract };
}

export const p1Input = createInputHandler(
  ['w', 'W'], ['s', 'S'], ['a', 'A'], ['d', 'D'], ['e', 'E']
);

export const p2Input = createInputHandler(
  ['ArrowUp'], ['ArrowDown'], ['ArrowLeft'], ['ArrowRight'], ['/']
);
