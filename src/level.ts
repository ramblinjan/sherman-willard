import { ZONE, COLS, ROWS } from './constants';
import type { ZoneId } from './constants';
import type { Point } from './types';
import { buildStations } from './stations';
import type { Station, RugDef } from './stations';

// A level as pure data. New levels = new LevelDef objects; nothing else changes.
export interface LevelDef {
  id: string;
  name: string;
  grid: ZoneId[][];                       // ROWS × COLS tile zones
  walkable: ZoneId[];                      // which zones the player can stand on
  rugs: RugDef[];                          // interaction footprints → stations
  spawn: Point;                            // player 1 start tile
  spawn2: Point;                           // player 2 start tile
  queue: Point[];                          // register-line waiting positions
  pickup: Point[];                         // pickup waiting positions
  exit: Point;                             // off-screen tile customers leave toward
  camera: { angleDeg: number; zoom: number }; // consumed by the renderer (Workstream B)
}

// A loaded, queryable level: wraps a LevelDef with a walkability set and the
// instantiated station list.
export class Level {
  readonly def: LevelDef;
  readonly stations: Station[];
  private readonly _walkable: Set<ZoneId>;

  constructor(def: LevelDef) {
    this.def = def;
    this._walkable = new Set(def.walkable);
    this.stations = buildStations(def.rugs);
  }

  getZone(col: number, row: number): ZoneId {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return ZONE.WALL;
    return this.def.grid[row][col];
  }

  isWalkable(col: number, row: number): boolean {
    return this._walkable.has(this.getZone(col, row));
  }

  get grid(): ZoneId[][]    { return this.def.grid; }
  get rugs(): RugDef[]      { return this.def.rugs; }
  get queuePositions(): Point[]  { return this.def.queue; }
  get pickupPositions(): Point[] { return this.def.pickup; }
  get exit(): Point         { return this.def.exit; }
  get camera()              { return this.def.camera; }
}

// The single active level. Set once at startup; read everywhere that used to
// reach for module-level MAP / RUGS / positions.
let _current: Level | null = null;

export function setCurrentLevel(level: Level): void {
  _current = level;
}

export function currentLevel(): Level {
  if (!_current) throw new Error('No level loaded — call setCurrentLevel() first');
  return _current;
}
