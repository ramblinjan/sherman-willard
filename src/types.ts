// Shared, dependency-free type definitions used across the game.

export type BaseType = 'WHITE' | 'GRAY' | 'DEEP';
export type HueCode = 'BL' | 'RD' | 'YL' | 'GR' | 'VL' | 'OR';

export interface Point { x: number; y: number; }

// A tile-space rectangle (column/row origin + width/height in tiles).
export interface Rect { col: number; row: number; w: number; h: number; }

export interface Order {
  id: number;
  customerName: string;
  colorName: string;
  baseType: BaseType;
  tintCode: string;
  tintHue: HueCode;
  canCount: number;
}
