import { ZONE } from '../constants';
import type { ZoneId } from '../constants';
import type { LevelDef } from '../level';

// Tile shorthand for the grid literal below.
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
const GRID: ZoneId[][] = [
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

export const storeLevel: LevelDef = {
  id: 'store',
  name: 'Sherman & Willard',
  grid: GRID,
  walkable: [
    ZONE.WAREHOUSE_FLOOR, ZONE.DOORWAY, ZONE.MAIN_FLOOR,
    ZONE.REGISTER, ZONE.PICKUP,
  ],
  rugs: [
    { col: 3,  row: 10, w: 3, h: 2, zone: ZONE.REGISTER },
    { col: 14, row: 10, w: 3, h: 2, zone: ZONE.PICKUP },
    { col: 3,  row: 8,  w: 2, h: 1, zone: ZONE.SHAKER_A },
    { col: 5,  row: 8,  w: 2, h: 1, zone: ZONE.SHAKER_B },
    { col: 7,  row: 8,  w: 2, h: 1, zone: ZONE.SHAKER_C },
    { col: 10, row: 8,  w: 2, h: 1, zone: ZONE.TINT_OUTPUT },
    { col: 12, row: 8,  w: 3, h: 1, zone: ZONE.TINT_MACHINE_BODY },
    { col: 15, row: 8,  w: 2, h: 1, zone: ZONE.TINT_INPUT },
    { col: 3,  row: 4,  w: 4, h: 1, zone: ZONE.SHELF_WHITE },
    { col: 8,  row: 4,  w: 4, h: 1, zone: ZONE.SHELF_GRAY },
    { col: 13, row: 4,  w: 4, h: 1, zone: ZONE.SHELF_DEEP },
  ],
  spawn:  { x: 9,  y: 9 },
  spawn2: { x: 11, y: 9 },
  queue: [
    { x: 4, y: 13 }, { x: 6, y: 13 }, { x: 8, y: 13 },
    { x: 4, y: 14 }, { x: 6, y: 14 }, { x: 8, y: 14 },
  ],
  pickup: [
    { x: 12, y: 13 }, { x: 14, y: 13 }, { x: 16, y: 13 },
    { x: 12, y: 14 }, { x: 14, y: 14 }, { x: 16, y: 14 },
  ],
  exit:   { x: 21.5, y: 13 },
  camera: { angleDeg: 0, zoom: 1 }, // top-down for now; Workstream B tilts to ~45°
};
