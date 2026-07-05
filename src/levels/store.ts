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
const KA = ZONE.SHAKER_A;
const KB = ZONE.SHAKER_B;
const KC = ZONE.SHAKER_C;
const KD = ZONE.SHAKER_D;
const KE = ZONE.SHAKER_E;
const KF = ZONE.SHAKER_F;
const CO = ZONE.COUNTER;
const RE = ZONE.REGISTER;
const PU = ZONE.PICKUP;
const SF = ZONE.STOREFRONT;

// 15 rows × 24 cols
// prettier-ignore
const GRID: ZoneId[][] = [
  //0   1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23
  [WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF], // row 0
  [WF,  WF,  WF,  WF,  SW,  SW,  SW,  SW,  WF,  WF,  SG,  SG,  SG,  SG,  WF,  WF,  SD,  SD,  SD,  SD,  WF,  WF,  WF,  WF], // row 1 — shelf blocks
  [WF,  WF,  WF,  WF,  SW,  SW,  SW,  SW,  WF,  WF,  SG,  SG,  SG,  SG,  WF,  WF,  SD,  SD,  SD,  SD,  WF,  WF,  WF,  WF], // row 2
  [WF,  WF,  WF,  WF,  SW,  SW,  SW,  SW,  WF,  WF,  SG,  SG,  SG,  SG,  WF,  WF,  SD,  SD,  SD,  SD,  WF,  WF,  WF,  WF], // row 3
  [WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF,  WF], // row 4 — walkable corridor
  [DW,  DW,  W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   W,   DW,  DW], // row 5 — wall, doors at both ends
  [MF,  MF,  KA,  KA,  KB,  KB,  KC,  KC,  KD,  KD,  KE,  KE,  KF,  KF,  MF,  TO,  TO,  TM,  TM,  TM,  TI,  TI,  MF,  MF], // row 6 — 6 shakers (1 row tall), tinter top
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  TO,  TO,  TM,  TM,  TM,  TI,  TI,  MF,  MF], // row 7 — shaker rug row, tinter bottom
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 8 — tinter rug row
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 9
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 10
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF], // row 11
  [CO,  CO,  CO,  CO,  RE,  RE,  RE,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  CO,  PU,  PU,  PU,  CO,  CO,  CO,  CO,  CO], // row 12 — counter
  [SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  PU,  PU,  PU,  SF,  SF,  SF,  SF,  SF], // row 13 — storefront
  [SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF,  SF], // row 14
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
    { col: 4,  row: 10, w: 3, h: 2, zone: ZONE.REGISTER },
    { col: 16, row: 10, w: 3, h: 2, zone: ZONE.PICKUP },
    { col: 2,  row: 7,  w: 2, h: 1, zone: ZONE.SHAKER_A },
    { col: 4,  row: 7,  w: 2, h: 1, zone: ZONE.SHAKER_B },
    { col: 6,  row: 7,  w: 2, h: 1, zone: ZONE.SHAKER_C },
    { col: 8,  row: 7,  w: 2, h: 1, zone: ZONE.SHAKER_D },
    { col: 10, row: 7,  w: 2, h: 1, zone: ZONE.SHAKER_E },
    { col: 12, row: 7,  w: 2, h: 1, zone: ZONE.SHAKER_F },
    { col: 15, row: 8,  w: 2, h: 1, zone: ZONE.TINT_OUTPUT },
    { col: 17, row: 8,  w: 3, h: 1, zone: ZONE.TINT_MACHINE_BODY },
    { col: 20, row: 8,  w: 2, h: 1, zone: ZONE.TINT_INPUT },
    { col: 4,  row: 4,  w: 4, h: 1, zone: ZONE.SHELF_WHITE },
    { col: 10, row: 4,  w: 4, h: 1, zone: ZONE.SHELF_GRAY },
    { col: 16, row: 4,  w: 4, h: 1, zone: ZONE.SHELF_DEEP },
  ],
  spawn:  { x: 11, y: 9 },
  spawn2: { x: 13, y: 9 },
  queue: [
    { x: 5,   y: 13 }, { x: 6.6, y: 13 }, { x: 8.2, y: 13 },
    { x: 9.8, y: 13 }, { x: 11.4, y: 13 }, { x: 13, y: 13 },
    { x: 5,   y: 14 }, { x: 6.6, y: 14 }, { x: 8.2, y: 14 },
    { x: 9.8, y: 14 }, { x: 11.4, y: 14 }, { x: 13, y: 14 },
  ],
  pickup: [
    { x: 15,   y: 13 }, { x: 16.4, y: 13 }, { x: 17.8, y: 13 },
    { x: 19.2, y: 13 }, { x: 20.6, y: 13 }, { x: 22,   y: 13 },
    { x: 15,   y: 14 }, { x: 16.4, y: 14 }, { x: 17.8, y: 14 },
    { x: 19.2, y: 14 }, { x: 20.6, y: 14 }, { x: 22,   y: 14 },
  ],
  exit:   { x: 25.5, y: 13 },
  camera: { angleDeg: 0, zoom: 1 }, // top-down for now; Workstream B tilts to ~45°
};
