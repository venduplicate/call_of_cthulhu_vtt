import {
  diceRoller,
  percentileRoller,
  PercentileRollerHandler,
  SkillChallengeHandler,
  skillChallengeHandler,
  type DiceHandler,
} from "../../utilities/DiceRoll";
import { checkSymbol } from "../../utilities/SymbolCheck";
import {
  burnSymbol,
  dbSymbol,
  halfDBSymbol,
  stunSymbol,
  weaponTypeStrings,
  type WeaponDamageTypes,
  type WeaponInterface,
} from "../types/Weapon";
import type { Skill } from "../types/Skills";
// import { StatusEffect } from "../types/StatusEffects";
import type { WeaponTypes } from "../types/Weapon";

// todo:
// need to check for stun in damage array
// need to check for burn in damage array
// find a way to recognize each
// and apply to opposing person
// get a list of effects that weapons can do.
// maybe split each of these out into separate classes
export class AttackHandler {
  dice: DiceHandler;
  skillCheck: SkillChallengeHandler;
  percentileRoller: PercentileRollerHandler;
  constructor() {
    this.dice = diceRoller;
    this.skillCheck = skillChallengeHandler;
    this.percentileRoller = percentileRoller;
  }
  getPenaltySkillRolls(totalPenalty: number) {
    return this.percentileRoller.penaltyDice(totalPenalty);
  }
  getBonusSkillRolls(totalBonus: number) {
    return this.percentileRoller.bonusDice(totalBonus);
  }
  attackNormally(skill: Skill) {
    const skillRoll = this.getNormalSkillRoll();
    const skillCheckMessage = this.getSkillCheckMessage(skill, skillRoll);
    return { roll: skillRoll, message: skillCheckMessage };
  }
  getNormalSkillRoll() {
    return this.percentileRoller.rollPercentile();
  }
  attackWithPenalty(skill: Skill, penaltyTotal: number) {
    const { min, total, diceArray } =
      this.percentileRoller.penaltyDice(penaltyTotal);
    const skillCheckMessage = this.getSkillCheckMessage(skill, total);
    return {
      roll: total,
      message: skillCheckMessage,
      diceArray: diceArray,
      min: min,
    };
  }
  attackWithBonus(skill: Skill, bonusTotal: number) {
    const { max, total, diceArray } =
      this.percentileRoller.bonusDice(bonusTotal);
    const skillCheckMessage = this.getSkillCheckMessage(skill, total);
    return {
      roll: total,
      message: skillCheckMessage,
      diceArray: diceArray,
      max: max,
    };
  }
  getSkillCheckMessage(skill: Skill, rolledValue: number) {
    if (this.compareSkillCheck(skill.reg, rolledValue)) {
      return this.skillCheck.determineSuccess(
        rolledValue,
        skill.reg,
        skill.half,
        skill.fifth
      );
    } else {
      return this.skillCheck.determineFailure(rolledValue, skill.reg);
    }
  }
  compareSkillCheck(regValue: number, rolledValue: number) {
    return rolledValue >= regValue;
  }
}
export class Weapon {
  id: string;
  name: string;
  skill: Skill;
  damageNotation: string;
  range: number;
  rangeMeasurement: string;
  attacks: number;
  ammoMax: number;
  ammoCurrent: number;
  malfunction: number;
  subType: string;
  isMalfunctioning: boolean;
  attackHandler: AttackHandler;
  constructor(data: WeaponInterface) {
    this.id = data.id;
    this.name = data.name;
    this.skill = data.skill;
    this.range = data.range;
    this.damageNotation = data.damageNotation;
    this.rangeMeasurement = data.rangeMeasurement;
    this.attacks = data.attacks;
    this.ammoMax = data.ammoMax;
    this.ammoCurrent = data.ammoCurrent;
    this.malfunction = data.malfunction;
    this.subType = data.subType;
    this.isMalfunctioning = data.isMalfunctioning || false;
    this.attackHandler = new AttackHandler();
  }
  getDamageNotation() {
    return this.damageNotation;
  }
}

// attack normally
// check if success or failure
// roll damage

// I want to attack
// DM: This is at a penalty
// OK, I will roll penalty
// click: Attack with penalty
// enter # of penalty dice
//

export class StatusEffectApplication {
  stun() {
    console.log("test");
  }
  burn() {
    console.log("test");
  }
}
export class FightingWeapon extends Weapon {
  type: Extract<WeaponTypes, "fighting" | "unnarmed">;
  damageBonus: number;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "fighting";
    this.damageBonus = data.damageBonus;
  }
  getDamageBonus() {
    return this.damageBonus;
  }
  containsStunSymbol(value: string) {
    return checkSymbol(value, stunSymbol);
  }
  containsHalfDamageBonusSymbol(value: string) {
    return checkSymbol(value, halfDBSymbol);
  }
  containsDamageBonusSymbol(value: string) {
    return checkSymbol(value, dbSymbol);
  }
  containsBurnSymbol(value: string) {
    return checkSymbol(value, burnSymbol);
  }
  replaceSymbol(notation: string, toReplace: WeaponDamageTypes | "") {
    const newNotation = notation.replace(toReplace, "").trim();
    return newNotation;
  }
  getNotationSymbol() {
    switch (true) {
      case this.containsBurnSymbol(this.damageNotation):
        return weaponTypeStrings.burn;
      case this.containsDamageBonusSymbol(this.damageNotation):
        return weaponTypeStrings.damageBonus;
      case this.containsHalfDamageBonusSymbol(this.damageNotation):
        return weaponTypeStrings.halfDamageBonus;
      case this.containsStunSymbol(this.damageNotation):
        return weaponTypeStrings.stun;
      default:
        return "";
    }
  }
  // getStatusEffect(name: string, description: string) {
  //   return new StatusEffect(name, description);
  // }
  formatNotation() {
    return this.replaceSymbol(this.damageNotation, this.getNotationSymbol());
  }
  getDamageNotation(): string {
    const notation = this.formatNotation();
    return notation;
  }
}

class ReloadWeapon extends Weapon {
  constructor(data: WeaponInterface) {
    super(data);
  }
  checkMalfunction(value: number) {
    return value >= this.malfunction;
  }
  setIsMalfunctioning(value: boolean) {
    this.isMalfunctioning = value;
    return this;
  }
  getCurrentAmmo() {
    return this.ammoCurrent;
  }
  subtractAmmo(amount: number) {
    const newAmmoAmount = this.getCurrentAmmo() - amount;
    this.ammoCurrent = newAmmoAmount;
    return this;
  }
  reload(amount: number) {
    const newAmmoAmount = this.getCurrentAmmo() + amount;
    this.ammoCurrent = newAmmoAmount;
    return this;
  }
}

// burn
// throw, fighting
// stun
// fighting, firearm,

export class FirearmWeapon extends ReloadWeapon {
  type: Extract<WeaponTypes, "firearm">;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "firearm";
  }
}

export class ArtilleryWeapon extends ReloadWeapon {
  type: Extract<WeaponTypes, "artillery">;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "artillery";
  }
}

export class UnnarmedWeapon extends FightingWeapon {
  type: Extract<WeaponTypes, "unnarmed">;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "unnarmed";
  }
}

export class DemolitionsWeapon extends Weapon {
  type: Extract<WeaponTypes, "demolitions">;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "demolitions";
  }
}

export class ElectricalWeapon extends Weapon {
  type: Extract<WeaponTypes, "electrical repair">;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "electrical repair";
  }
}

export class ThrowWeapon extends Weapon {
  type: Extract<WeaponTypes, "throw">;
  constructor(data: WeaponInterface) {
    super(data);
    this.type = "throw";
  }
}
