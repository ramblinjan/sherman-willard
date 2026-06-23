import { ZONE, COLS, ROWS } from './constants.js';

const W  = ZONE.WALL;
const WF = ZONE.WAREHOUSE_FLOOR;
const SW = ZONE.SHELF_WHITE;
const SG = ZONE.SHELF_GRAY;
const SD = ZONE.SHELF_DEEP;
const TI = ZONE.TINT_INPUT;
const TM = ZONE.TINT_MACHINE_BODY;
const TO = ZONE.TINT_OUTPUT;
const DW = ZONE.DOORWAY;
const MF = ZONE.MAIN_FLOOR;
const SA = ZONE.SHAKER_A;
const SB = ZONE.SHAKER_B;
const SC = ZONE.SHAKER_C;
const CO = ZONE.COUNTER;
const RE = ZONE.REGISTER;
const PU = ZONE.PICKUP;
const SF = ZONE.STOREFRONT;

// 15 rows × 20 cols
// prettier-ignore
const MAP = [
  //0   1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19
  [WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF], // row 0
  [WF,  WF,  WF,  SW,  SW,  SW,  SW,  WF,  SG,  SG,  SG,  SG,  WF,  SD,  SD,  SD,  SD,  WF,  WF,  WF], // row 1 — shelves shifted right 2
  [WF,  WF,  WF,  SW,  SW,  SW,  SW,  WF,  SG,  SG,  SG,  SG,  WF,  SD,  SD,  SD,  SD,  WF,  WF,  WF], // row 2
  [WF,  WF,  WF,  SW,  SW,  SW,  SW,  WF,  SG,  SG,  SG,  SG,  WF,  SD,  SD,  SD,  SD,  WF,  WF,  WF], // row 3
  [WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF], // row 4 — walkable corridor
  [DW,  DW,  W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   DW,  DW], // row 5 — wall, doors far-left + far-right
  [MF,  MF,  MF,  SA,  SA,  SB,  SB,  SC,  SC,  MF,  TO,  TO,  TM,  TM,  TM,  TI,  TI,  MF,  MF,  MF], // row 6 — shakers right 2, tinter left 3
  [MF,  MF,  MF,  SA,  SA,  SB,  SB,  SC,  SC,  MF,  TO,  TO,  TM,  TM,  TM,  TI,  TI,  MF,  MF,  MF], // row 7
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 8 — operating aisle
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 9
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 10
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 11
  [CO,  CO,  CO,  RE,  RE,  RE,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  PU,  PU,  PU,  CO,  CO,  CO], // row 12
  [SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  PU,  PU,  PU,  SF,  SF,  SF], // row 13
  [SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF], // row 14
];

const WALKABLE = new Set([
  ZONE.WAREHOUSE_FLOOR, ZONE.DOORWAY, ZONE.MAIN_FLOOR,
  ZONE.REGISTER, ZONE.PICKUP,
]);

export const INTERACT_POINTS = {
  [ZONE.REGISTER]:          { x: 4,    y: 11   },
  [ZONE.PICKUP]:            { x: 15,   y: 11   },
  // Shelves shifted right 2
  [ZONE.SHELF_WHITE]:       { x: 4.5,  y: 4    },
  [ZONE.SHELF_GRAY]:        { x: 9.5,  y: 4    },
  [ZONE.SHELF_DEEP]:        { x: 14.5, y: 4    },
  // Tinting machine shifted left 3 (cols 10-16), rows 6-7; hot zones at row 8
  // Flipped: SEAL left (cols 10-11), body center (cols 12-14), LOAD right (cols 15-16)
  [ZONE.TINT_OUTPUT]:       { x: 10.5, y: 8    },
  [ZONE.TINT_MACHINE_BODY]: { x: 13,   y: 8    },
  [ZONE.TINT_INPUT]:        { x: 15.5, y: 8    },
  // Shakers shifted right 2 (cols 3-4, 5-6, 7-8), rows 6-7; interact from row 8
  [ZONE.SHAKER_A]:          { x: 3.5,  y: 8    },
  [ZONE.SHAKER_B]:          { x: 5.5,  y: 8    },
  [ZONE.SHAKER_C]:          { x: 7.5,  y: 8    },
};

export function getZone(col, row) {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return ZONE.WALL;
  return MAP[row][col];
}

export function isWalkable(col, row) {
  return WALKABLE.has(getZone(col, row));
}

export function getNearbyInteractZone(px, py) {
  let closest = null;
  let closestDist = Infinity;

  for (const [zone, pt] of Object.entries(INTERACT_POINTS)) {
    const dist = Math.abs(px - pt.x) + Math.abs(py - pt.y);
    if (dist < 1.8 && dist < closestDist) {
      closestDist = dist;
      closest = zone;
    }
  }

  return closest;
}

export { MAP };
