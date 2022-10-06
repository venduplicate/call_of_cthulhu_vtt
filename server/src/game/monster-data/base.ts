export interface BaseMonster {
    name: string;
    str: number;
    con: number;
    siz: number;
    dex: number;
    int: number;
    pow: number;
    hp: number;
    damage_bonus: string;
  magic_points: number;
  build: number;
  move: number;
  swim?: number;
  fly?: number;
  combat?: {
    per_round: number;
    fighting?: 100;
    damage: string;
    tactics: string;
    attacks: {}[];
    armor?: number;
  };
  abilities: {},
  spells: string,
  sanity_loss: string;
}