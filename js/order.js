import { BASE_TYPES, HUE_CODES } from './constants.js';

const TITLES    = ['Mrs.', 'Mr.', 'Dr.', 'Ms.', 'Mx.'];
const LAST_NAMES = [
  'Hadley', 'Chen', 'Okafor', 'Rivera', 'Bauer', 'Singh', 'Novak', 'Patel',
  'Moreau', 'Andersen', 'Kowalski', 'Yamamoto', 'Torres', 'Brennan', 'Osei',
  'Varga', 'Bloom', 'Nakamura', 'Flores', 'Adeyemi',
];
// Sherman & Willard Co. catalog names — deadpan, earnest, mildly existential.
const COLOR_NAMES = [
  'Surrender White', 'Cream of Nowhere', 'Pastoral Anxiety', 'Good Enough',
  'Commitment Issues', 'The Gray Area', 'Fine Whatever', 'Tuesday',
  'Unresolved', 'Measured Optimism', 'Late Afternoon', 'Going Once',
  'Safe Choice', 'Baseline Beige', "Buyer's Remorse", 'Unprompted Terracotta',
  'Lawn Envy', 'Passive Sage', "Someone Else's Garden", 'Forest Floor',
  'Second Thoughts', 'Acceptable Melancholy', 'The Deep End', 'Quiet Lake',
  'Decisive Red', 'Regrettable Burgundy', 'Modest Blush', 'Midnight Shift',
  'The Dark at the End', 'Obsidian Tuesday',
];
const GALLON_OPTS = [1, 2, 5];

let nextId = 1;

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateOrder() {
  const hue = pick(HUE_CODES);
  const intensity = Math.floor(Math.random() * 8) + 1;
  return {
    id:           nextId++,
    customerName: pick(TITLES) + ' ' + pick(LAST_NAMES),
    colorName:    pick(COLOR_NAMES),
    baseType:     pick(BASE_TYPES),
    tintCode:     `${hue}-${intensity}`,
    tintHue:      hue,
    gallons:      pick(GALLON_OPTS),
  };
}
