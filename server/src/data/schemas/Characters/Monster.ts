import { CharacterBase } from "./CharacterBase.js";

export interface MonsterBase extends CharacterBase {
  damage: string;
  damage_bonus: string;
  magic_points: number;
  build: number;
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

export type MonsterInterface = Omit<MonsterBase, "combat_skills">;

export class MonsterSchema extends CharacterBase implements MonsterInterface {
  damage: string;
  damage_bonus: string;
  magic_points: number;
  build: number;
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
  constructor(data: MonsterInterface) {
    super(data);
    this.damage = data.damage;
    this.damage_bonus = data.damage_bonus;
    this.magic_points = data.magic_points;
    this.build = data.build;
    this.swim = data.swim ? data.swim : 0;
    this.fly = data.fly ? data.fly : 0;
    this.combat = data.combat ? data.combat : undefined;
    this.abilities = data.abilities;
    this.spells = data.spells;
    this.sanity_loss_success = data.sanity_loss_success;
    this.sanity_loss_failure = data.sanity_loss_failure;
    this.attacks_complete = 0;
  }
  getTest() {
    console.log(this.combat_skills);
  }
}
