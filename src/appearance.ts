// 24 hand-curated customer looks, drawn procedurally by the renderer.
// hairColor doubles as the hat color for cap/beanie/hardhat styles.

export type HairStyle =
  'bald' | 'short' | 'long' | 'bun' | 'ponytail' | 'afro' |
  'cap' | 'beanie' | 'hardhat' | 'mohawk';

export type Accessory =
  'none' | 'glasses' | 'sunglasses' | 'beard' | 'mustache' |
  'headphones' | 'hivis' | 'apron' | 'toolbelt' | 'bowtie';

export interface Appearance {
  skin: string;
  shirt: string;
  pants: string;
  hairColor: string;
  hairStyle: HairStyle;
  accessory: Accessory;
}

export const APPEARANCES: Appearance[] = [
  // Trades
  { skin: '#e8b88a', shirt: '#ee7722', pants: '#4a4a55', hairColor: '#ffdd22', hairStyle: 'hardhat',  accessory: 'hivis' },     // 0 contractor
  { skin: '#9c6a3f', shirt: '#556677', pants: '#3a3a44', hairColor: '#ffffff', hairStyle: 'hardhat',  accessory: 'toolbelt' },  // 1 site foreman
  { skin: '#f2d0b0', shirt: '#88a0b8', pants: '#5a4a3a', hairColor: '#7a4a2a', hairStyle: 'cap',      accessory: 'beard' },     // 2 carpenter
  { skin: '#c68e5a', shirt: '#dddddd', pants: '#8898a8', hairColor: '#2a2a2a', hairStyle: 'short',    accessory: 'apron' },     // 3 painter in whites
  // Design world
  { skin: '#f2d0b0', shirt: '#1a1a1a', pants: '#1a1a1a', hairColor: '#1a1a1a', hairStyle: 'bun',      accessory: 'glasses' },   // 4 all-black designer
  { skin: '#7a4a2a', shirt: '#c05070', pants: '#3a3a44', hairColor: '#101010', hairStyle: 'afro',     accessory: 'glasses' },   // 5 color consultant
  { skin: '#e8b88a', shirt: '#e8e0d0', pants: '#c0b8a8', hairColor: '#d8b878', hairStyle: 'long',     accessory: 'none' },      // 6 home stager
  { skin: '#c68e5a', shirt: '#4a3a5a', pants: '#2a2a34', hairColor: '#3a2a1a', hairStyle: 'ponytail', accessory: 'bowtie' },    // 7 gallery type
  // Regulars
  { skin: '#f2d0b0', shirt: '#7a8a5a', pants: '#5a5044', hairColor: '#cccccc', hairStyle: 'short',    accessory: 'mustache' },  // 8 retiree
  { skin: '#e8b88a', shirt: '#c05050', pants: '#4a5a6a', hairColor: '#e0e0e0', hairStyle: 'bun',      accessory: 'glasses' },   // 9 grandmother
  { skin: '#9c6a3f', shirt: '#3a6a4a', pants: '#3a3a44', hairColor: '#101010', hairStyle: 'short',    accessory: 'none' },      // 10 new homeowner
  { skin: '#f2d0b0', shirt: '#8855cc', pants: '#2a2a34', hairColor: '#cc4488', hairStyle: 'mohawk',   accessory: 'none' },      // 11 art student
  { skin: '#c68e5a', shirt: '#2a3a4a', pants: '#4a4a55', hairColor: '#2a2a2a', hairStyle: 'beanie',   accessory: 'headphones' },// 12 streamer
  { skin: '#7a4a2a', shirt: '#e0c040', pants: '#5a4a3a', hairColor: '#101010', hairStyle: 'long',     accessory: 'sunglasses' },// 13 influencer
  { skin: '#e8b88a', shirt: '#607a90', pants: '#3a3a44', hairColor: '#8a5a2a', hairStyle: 'ponytail', accessory: 'none' },      // 14 gym-goer
  { skin: '#f2d0b0', shirt: '#4a4a55', pants: '#2a2a34', hairColor: '#3a2a1a', hairStyle: 'short',    accessory: 'beard' },     // 15 programmer
  { skin: '#9c6a3f', shirt: '#b05a3a', pants: '#4a3a2a', hairColor: '#2a1a10', hairStyle: 'cap',      accessory: 'none' },      // 16 weekend warrior
  { skin: '#c68e5a', shirt: '#d8d0c0', pants: '#7a6a5a', hairColor: '#b0b0b0', hairStyle: 'bald',     accessory: 'glasses' },   // 17 professor
  { skin: '#f2d0b0', shirt: '#5a7a8a', pants: '#3a4a5a', hairColor: '#d8b878', hairStyle: 'cap',      accessory: 'mustache' },  // 18 fisherman
  { skin: '#7a4a2a', shirt: '#8a3a4a', pants: '#2a2a34', hairColor: '#101010', hairStyle: 'bun',      accessory: 'apron' },     // 19 chef
  { skin: '#e8b88a', shirt: '#3a5a3a', pants: '#4a4a3a', hairColor: '#5a4a2a', hairStyle: 'beanie',   accessory: 'beard' },     // 20 gardener
  { skin: '#9c6a3f', shirt: '#7a5aa0', pants: '#3a3a44', hairColor: '#2a2a2a', hairStyle: 'afro',     accessory: 'headphones' },// 21 musician
  { skin: '#f2d0b0', shirt: '#c07840', pants: '#5a4a3a', hairColor: '#c05a2a', hairStyle: 'long',     accessory: 'none' },      // 22 potter
  { skin: '#c68e5a', shirt: '#30404e', pants: '#22262e', hairColor: '#888888', hairStyle: 'bald',     accessory: 'sunglasses' },// 23 mystery regular
];

// Shuffled-deck draw so simultaneous customers never share a look until all
// 24 are on screen at once (we cap at 24 in-store, so effectively never).
let _deck: number[] = [];

export function drawAppearanceIndex(): number {
  if (_deck.length === 0) {
    _deck = APPEARANCES.map((_, i) => i);
    for (let i = _deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_deck[i], _deck[j]] = [_deck[j], _deck[i]];
    }
  }
  return _deck.pop()!;
}
