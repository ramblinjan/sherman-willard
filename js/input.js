const keys = {};
let interactPressed = false;

export function initInput() {
  window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === 'e' || e.key === 'E') interactPressed = true;
  });
  window.addEventListener('keyup', e => {
    keys[e.key] = false;
  });
}

export function isDown(key) {
  return !!keys[key];
}

export function getMoveDelta() {
  let dx = 0, dy = 0;
  if (isDown('w') || isDown('W') || isDown('ArrowUp'))    dy -= 1;
  if (isDown('s') || isDown('S') || isDown('ArrowDown'))  dy += 1;
  if (isDown('a') || isDown('A') || isDown('ArrowLeft'))  dx -= 1;
  if (isDown('d') || isDown('D') || isDown('ArrowRight')) dx += 1;
  return { dx, dy };
}

// Edge-triggered: returns true once per keypress, then resets
export function consumeInteract() {
  if (interactPressed) {
    interactPressed = false;
    return true;
  }
  return false;
}
