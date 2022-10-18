import type { Skill } from "./Skills";
import type { SchemaBase } from "./SchemaBase";

export const weaponTypeStrings = {
  damageBonus: "DB",
  halfDamageBonus: "Half DB",
  burn: "burn",
  stun: "stun",
  yard: "yards",
};

export type StatusTypes =
  | typeof weaponTypeStrings.burn
  | typeof weaponTypeStrings.stun;
export type DamageBonusTypes =
  | typeof weaponTypeStrings.damageBonus
  | typeof weaponTypeStrings.halfDamageBonus;

export type yardsType = typeof weaponTypeStrings.yard;

export type WeaponDamageTypes = yardsType | StatusTypes | DamageBonusTypes;

export const halfDBSymbol = Symbol.for(weaponTypeStrings.halfDamageBonus);
export const dbSymbol = Symbol.for(weaponTypeStrings.damageBonus);

export const burnSymbol = Symbol.for(weaponTypeStrings.burn);
export const stunSymbol = Symbol.for(weaponTypeStrings.stun);

export const yardsSymbol = Symbol.for(typeof weaponTypeStrings.yard);

export type WeaponMap = Map<string, WeaponInterface>;

export type WeaponTypes =
  | "none"
  | "firearm"
  | "fighting"
  | "throw"
  | "artillery"
  | "unnarmed"
  | "demolitions"
  | "electrical repair";

export interface WeaponInterface extends SchemaBase {
  name: string;
  subType: string;
  type: WeaponTypes;
  skill: Skill;
  damageNotation: string;
  range: number;
  rangeMeasurement: string;
  attacks: number;
  ammoMax: number;
  ammoCurrent: number;
  malfunction: number;
  damageBonus: number;
  isMalfunctioning: boolean;
}
