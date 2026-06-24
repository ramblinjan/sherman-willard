export function createInputHandler(upKeys, downKeys, leftKeys, rightKeys, interactKeys) {
  const keys = {};
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

  function getMoveDelta() {
    let dx = 0, dy = 0;
    if (upKeys.some(k    => keys[k])) dy -= 1;
    if (downKeys.some(k  => keys[k])) dy += 1;
    if (leftKeys.some(k  => keys[k])) dx -= 1;
    if (rightKeys.some(k => keys[k])) dx += 1;
    return { dx, dy };
  }

  function consumeInteract() {
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
