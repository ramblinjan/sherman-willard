import type { BaseType } from './types';

// A single physical paint can the player (or, later, a station/floor) can hold.
// Replaces the old player.cans / sealedCans / mixedCans arrays — one type, with
// `stage` tracking where it is in the pipeline. `spilled` is groundwork for the
// future spill mechanic (rendered differently; no gameplay yet).
export type ItemStage =
  | 'empty'   // grabbed at register, no base yet
  | 'based'   // base grabbed, ready for the tinter
  | 'sealed'  // tinted + sealed, ready for a shaker
  | 'mixed';  // shaken, ready for pickup handoff

export interface Item {
  id: number;
  kind: 'can';
  stage: ItemStage;
  ticketId: number;
  baseType: BaseType | null;
  spilled: boolean;
}

let _seq = 0;

// Create a fresh empty can bound to a ticket.
export function makeCan(ticketId: number): Item {
  return { id: ++_seq, kind: 'can', stage: 'empty', ticketId, baseType: null, spilled: false };
}
