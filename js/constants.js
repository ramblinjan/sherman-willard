export const TILE = 40;
export const DAY_DURATION = 360; // seconds per shift
export const COLS = 20;
export const ROWS = 15;

export const ZONE = {
  WAREHOUSE_FLOOR: 'WAREHOUSE_FLOOR',
  SHELF_WHITE:     'SHELF_WHITE',
  SHELF_GRAY:      'SHELF_GRAY',
  SHELF_DEEP:      'SHELF_DEEP',
  TINT_INPUT:      'TINT_INPUT',
  TINT_MACHINE_BODY: 'TINT_MACHINE_BODY',
  TINT_OUTPUT:     'TINT_OUTPUT',
  WALL:            'WALL',
  DOORWAY:         'DOORWAY',
  MAIN_FLOOR:      'MAIN_FLOOR',
  SHAKER_A:        'SHAKER_A',
  SHAKER_B:        'SHAKER_B',
  SHAKER_C:        'SHAKER_C',
  COUNTER:         'COUNTER',
  REGISTER:        'REGISTER',
  PICKUP:          'PICKUP',
  STOREFRONT:      'STOREFRONT',
};

export const BASE_TYPES = ['WHITE', 'GRAY', 'DEEP'];
export const HUE_CODES  = ['BL', 'RD', 'YL', 'GR', 'VL', 'OR'];

// Base-type-dependent shake durations (seconds)
export const SHAKE_DURATIONS = { WHITE: 5, GRAY: 10, DEEP: 15 };

// Base-type-dependent tint durations (seconds)
export const TINT_DURATIONS = { WHITE: 3, GRAY: 6, DEEP: 9 };

export const TINT_COLORS = {
  BL: '#2255bb',
  RD: '#bb2233',
  YL: '#ccaa00',
  GR: '#226633',
  VL: '#6633aa',
  OR: '#cc6600',
};

export const BASE_COLORS = {
  WHITE: '#e8e0d0',
  GRAY:  '#8a8a8a',
  DEEP:  '#3a3a4a',
};

export const TILE_COLORS = {
  WAREHOUSE_FLOOR:  '#c8b89a',
  SHELF_WHITE:      '#e8e0d0',
  SHELF_GRAY:       '#8a8a8a',
  SHELF_DEEP:       '#3a3a4a',
  TINT_INPUT:       '#2a2040',
  TINT_MACHINE_BODY:'#1a1030',
  TINT_OUTPUT:      '#2a2040',
  WALL:             '#3a3a3a',
  DOORWAY:          '#b8a88a',
  MAIN_FLOOR:       '#ede8df',
  SHAKER_A:         '#4a6080',
  SHAKER_B:         '#4a6080',
  SHAKER_C:         '#4a6080',
  COUNTER:          '#6a5a4a',
  REGISTER:         '#ede8df',
  PICKUP:           '#ede8df',
  STOREFRONT:       '#d8d0c8',
};
