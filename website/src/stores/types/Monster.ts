import type { SchemaBase } from "./SchemaBase";

export interface MonsterFirestoreInterface extends SchemaBase {
  name: string;
  str: number;
  con: number;
  siz: number;
  dex: number;
  int: number;
  pow: number;
  hp: number;
  damage: string;
  damage_bonus: string;
  magic_points: number;
  build: number;
  move: number;
  swim?: number;
  fly?: number;
  combat?: {
    per_round: number;
    fighting: number;
    damage: string;
    tactics: string;
    attacks: any[];
    armor: number;
  };
  abilities: any;
  spells: string;
  sanity_loss_success: string;
  sanity_loss_failure: string;
  attacks_complete: number;
}

export class MonsterSchema {
  id: string;
  name: string;
  str: number;
  con: number;
  siz: number;
  dex: number;
  int: number;
  pow: number;
  hp: number;
  damage_bonus: string;
  damage: string;
  magic_points: number;
  build: number;
  move: number;
  swim?: number;
  fly?: number;
  combat?: {
    per_round: number;
    fighting: number;
    damage: string;
    tactics: string;
    attacks: any[];
    armor: number;
  };
  abilities: any;
  spells: string;
  sanity_loss_success: string;
  sanity_loss_failure: string;
  attacks_complete: number;
  constructor(data: MonsterFirestoreInterface) {
    this.id = data.id;
    this.name = data.name;
    this.str = data.str;
    this.con = data.con;
    this.siz = data.siz;
    this.dex = data.dex;
    this.int = data.int;
    this.pow = data.pow;
    this.hp = data.hp;
    this.damage = data.damage;
    this.damage_bonus = data.damage_bonus;
    this.magic_points = data.magic_points;
    this.build = data.build;
    this.move = data.move;
    this.swim = data.swim ? data.swim : 0;
    this.fly = data.fly ? data.fly : 0;
    this.combat = data.combat ? data.combat : undefined;
    this.abilities = data.abilities;
    this.spells = data.spells;
    this.sanity_loss_success = data.sanity_loss_success;
    this.sanity_loss_failure = data.sanity_loss_failure;
    this.attacks_complete = 0;
  }
}
