import { ZONE, COLS, ROWS } from './constants.js';

const W  = ZONE.WALL;
const WF = ZONE.WAREHOUSE_FLOOR;
const SW = ZONE.SHELF_WHITE;
const SG = ZONE.SHELF_GRAY;
const SD = ZONE.SHELF_DEEP;
const TS = ZONE.TINT_STATION;
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
  [WF,  SW,  SW,  SW,  SW,  WF,  SG,  SG,  SG,  SG,  WF,  SD,  SD,  SD,  SD,  WF,  TS,  TS,  TS,  TS], // row 1
  [WF,  SW,  SW,  SW,  SW,  WF,  SG,  SG,  SG,  SG,  WF,  SD,  SD,  SD,  SD,  WF,  TS,  TS,  TS,  TS], // row 2
  [WF,  SW,  SW,  SW,  SW,  WF,  SG,  SG,  SG,  SG,  WF,  SD,  SD,  SD,  SD,  WF,  TS,  TS,  TS,  TS], // row 3
  [WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF], // row 4
  [W,   W,   W,   W,   W,   W,   W,   W,   DW,  DW,  DW,  W,   W,   W,   W,   W,   W,   W,   W,   W ], // row 5 (wall/doorway)
  [MF,  SA,  SA,  SA,  MF,  SB,  SB,  SB,  MF,  SC,  SC,  SC,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 6 — shakers A B C
  [MF,  SA,  SA,  SA,  MF,  SB,  SB,  SB,  MF,  SC,  SC,  SC,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 7 — shakers A B C
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 8 — walkable corridor below shakers
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 9
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 10
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 11
  [CO,  CO,  CO,  RE,  RE,  RE,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  PU,  PU,  PU,  CO,  CO,  CO], // row 12 (counter)
  [SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  PU,  PU,  PU,  SF,  SF,  SF], // row 13
  [SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF], // row 14
];

const WALKABLE = new Set([
  ZONE.WAREHOUSE_FLOOR, ZONE.DOORWAY, ZONE.MAIN_FLOOR,
  ZONE.REGISTER, ZONE.PICKUP,
]);

// Interaction point centers (tile coords) for each zone.
// Player must stand near these to press E.
export const INTERACT_POINTS = {
  [ZONE.REGISTER]:     { x: 4,  y: 11 },
  [ZONE.PICKUP]:       { x: 15, y: 11 },
  [ZONE.SHELF_WHITE]:  { x: 2,  y: 4  },
  [ZONE.SHELF_GRAY]:   { x: 7,  y: 4  },
  [ZONE.SHELF_DEEP]:   { x: 12, y: 4  },
  [ZONE.TINT_STATION]: { x: 15, y: 2  },
  [ZONE.SHAKER_A]:     { x: 2,  y: 8  }, // stand in row-8 corridor below center of shaker A
  [ZONE.SHAKER_B]:     { x: 6,  y: 8  },
  [ZONE.SHAKER_C]:     { x: 10, y: 8  },
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
