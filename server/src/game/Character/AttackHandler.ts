import { Skill } from "./SkillHandler";
import {
  isDiceMatch,
  isMathOperatorMatch,
  mathOperatorRegex,
} from "../../utilities/RegexChecks";
import { isNumeric } from "../../utilities/TypeChecking";
import { diceRoller, DiceHandler } from "../../utilities/DiceRoll";
import { checkSymbol } from "../../utilities/SymbolCheck";

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
  subType: string;
  skill: Skill;
  damageNotation: string;
  range: number;
  rangeMeasurement: string;
  attacks: number;
  ammo: number;
  malfunction: number;
  damageBonus: number;
}

export const halfDBSymbol = Symbol.for("Half DB");
export const burnSymbol = Symbol.for("burn");
export const dbSymbol = Symbol.for("DB");
export const yardsSymbol = Symbol.for("yards");
export const stunSymbol = Symbol.for("stun");

export type WeaponMap = Map<string, Weapon>;

// check if dx
// check if operator
// check for symbol

// todo:
// need to check for stun in damage array
// need to check for burn in damage array
// find a way to recognize each
// and apply to opposing person
// get a list of effects that weapons can do.
// maybe split each of these out into separate classes
export class Weapon {
  id: string;
  name: string;
  skill: Skill;
  damageNotation: string;
  range: number;
  rangeMeasurement: string;
  attacks: number;
  ammo: number;
  malfunction: number;
  damageBonus: number;
  subType: string;
  dice: DiceHandler;
  constructor(data: Weapon) {
    this.id = data.id;
    this.name = data.name;
    this.skill = data.skill;
    this.range = data.range;
    this.damageNotation = data.damageNotation;
    this.damageBonus = data.damageBonus;
    this.rangeMeasurement = data.rangeMeasurement;
    this.attacks = data.attacks;
    this.ammo = data.ammo;
    this.malfunction = data.malfunction;
    this.type = data.type;
    this.subType = data.subType;
    this.dice = diceRoller;
  }
  createDamageNotation(damageArray: string[]) {
    let notation = "";
    damageArray.forEach((value: string) => {
      switch (true) {
        case isDiceMatch(value):
          notation += value;
          break;
        case checkSymbol(value, halfDBSymbol):
          notation += `${this.getDamageBonus() / 2}`;
          break;
        case checkSymbol(value, dbSymbol):
          notation += `${this.getDamageBonus() / 2}`;
          break;
        case checkSymbol(value, burnSymbol):
          // how to calculate burn damage?
          notation += "";
          break;
        case checkSymbol(value, stunSymbol):
          // calculate stun
          notation += "";
          break;
        case isMathOperatorMatch(value):
          break;
      }
    });
  }
  getDamageBonus() {
    if (this.isFightingType()) {
      return this.damageBonus;
    } else {
      return 0;
    }
  }
  isFightingType() {
    return this.type == "fighting";
  }
}

export class FightingWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class FirearmWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class ArtilleryWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class UnnarmedWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class DemolitionsWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class ElectricalWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class ThrowWeapon extends Weapon {
  constructor(data: Weapon) {
    super(data);
  }
}

export class AttackHandler {}
