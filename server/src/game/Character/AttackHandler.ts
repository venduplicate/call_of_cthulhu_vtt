import { Skill } from "./SkillHandler";

type WeaponTypes =
  | "firearm"
  | "fighting"
  | "throw"
  | "artillery"
  | "unnarmed"
  | "demolitions"
  | "electrical repair";

export interface Weapon {
  name: string;
  type: WeaponTypes;
  skill: Skill;
  damage: string;
  range: number;
  rangeMeasurement: string;
  attacks: number;
  ammo: number;
  malfunction: number;
  damageBonus: string;
}

export const halfDBSymbol = Symbol.for("Half DB");
export const burnSymbol = Symbol.for("burn");
export const dbSymbol = Symbol.for("DB");
export const yardsSymbol = Symbol.for("yards");

export type WeaponMap = Map<string, Weapon>;

export class Weapon {
  id: string;
  name: string;
  skill: Skill;
  damage: string;
  range: number;
  rangeMeasurement: string;
  attacks: number;
  ammo: number;
  malfunction: number;
  damageBonus: string;
  constructor(data: Weapon) {
    this.id = data.id;
    this.name = data.name;
    this.skill = data.skill;
    this.range = data.range;
    this.damage = data.damage;
    this.damageBonus = data.damageBonus;
    this.rangeMeasurement = data.rangeMeasurement;
    this.attacks = data.attacks;
    this.ammo = data.ammo;
    this.malfunction = data.malfunction;
  }
}

// "2d8+stun"
// "1d3+half db"

export class AttackHandler {}
