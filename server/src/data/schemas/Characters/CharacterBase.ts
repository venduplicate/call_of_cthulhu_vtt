import { list_of_skills } from "../../../game/static/skills";
import {
  DiceHandler,
  percentileRoller,
  PercentileRollerHandler,
  roller,
  skillChallenge,
  SkillChallengeHandler,
} from "../../../utilities/DiceRoll";
import { SchemaBase } from "../SchemaBase";
import { v4 } from "uuid";
import { InitiativeInterface } from "../Initiative";

const combatStats = ["Firearms", "Fighting", "Dodge"];

export interface Characteristic {
  reg: number;
  half: number;
  fifth: number;
}

export type CharacteristicStrings =
  | "str"
  | "dex"
  | "con"
  | "siz"
  | "app"
  | "int"
  | "pow"
  | "edu"
  | "luck";

export type CharacteristicList = Record<CharacteristicStrings, Characteristic>;

export interface Skill extends Characteristic {
  name: string;
  hasImproved: boolean;
}

type SkillType = typeof list_of_skills;

export type SkillStrings = SkillType[number];

export type Skills = Map<SkillStrings, Skill>;

export type InsanityTypes = "temporary" | "indefinite" | "permanent";

type WeaponTypes =
  | "firearm"
  | "fighting"
  | "throw"
  | "artillery"
  | "unnarmed"
  | "demolitions"
  | "electrical repair";

export interface Weapon extends Characteristic {
  name: string;
  type: WeaponTypes;
  damage: string;
  range: string;
  attacks: number;
  ammo: number;
  malf: string;
}

export interface HandlerInterface {
  roller: DiceHandler;
  percentileRoller: PercentileRollerHandler;
  skillChallengeHandler: SkillChallengeHandler;
}

export interface CharacterBaseInterface extends SchemaBase {
  name: string;
  player: string;
  controlledById: string;
  occupation: string;
  age: number;
  pronouns: string;
  gender: string;
  residence: string;
  birthplace: string;
  skills: Skills;
  weapons: Weapon[];
  characteristics: CharacteristicList;
  total_sanity_loss: number;
  maximum_sanity: number;
  current_sanity: number;
  combat_skills?: Skill[];
  hp: number;
  move: number;
}



export class CharacterBase implements CharacterBaseInterface {
  id: string;
  name: string;
  player: string;
  controlledById: string;
  occupation: string;
  age: number;
  pronouns: string;
  gender: string;
  residence: string;
  birthplace: string;
  characteristics: CharacteristicList;
  skills: Skills;
  weapons: Weapon[];
  total_sanity_loss: number;
  maximum_sanity: number;
  current_sanity: number;
  combat_skills: Skill[];
  roller: DiceHandler;
  percentileRoller: PercentileRollerHandler;
  skillChallengeHandler: SkillChallengeHandler;
  hp: number;
  move: number;
  constructor(data: CharacterBaseInterface) {
    this.id = data.id;
    this.name = data.name;
    this.player = data.player;
    this.controlledById = data.controlledById;
    this.occupation = data.occupation;
    this.age = data.age;
    this.occupation = data.occupation;
    this.pronouns = data.pronouns;
    this.gender = data.gender;
    this.residence = data.residence;
    this.birthplace = data.birthplace;
    this.characteristics = data.characteristics;
    this.skills = data.skills;
    this.weapons = data.weapons;
    this.total_sanity_loss = data.total_sanity_loss;
    this.maximum_sanity = data.maximum_sanity;
    this.current_sanity = data.current_sanity;
    this.roller = roller;
    this.percentileRoller = percentileRoller;
    this.skillChallengeHandler = skillChallenge;
    this.combat_skills = data.combat_skills ? data.combat_skills : [];
    this.hp = data.hp;
    this.move = data.move;
  }
  initialize() {
    this.setCombatSkills();
    this.subtractMythosFromSanity();
  }
  setCombatSkills() {
    this.skills.forEach((skill: Skill) => {
      const index = combatStats
        .map((value: string) => value)
        .indexOf(skill.name);
      if (index > -1) {
        this.combat_skills.push(skill);
      } else {
        return;
      }
    });
  }
  subtractMythosFromSanity() {
    const CthulhuMythosNum = this.skills.get("Cthulhu Mythos");
    if (CthulhuMythosNum != null) {
      const newSanityMax = this.maximum_sanity - CthulhuMythosNum.reg;
      this.maximum_sanity = newSanityMax;
    }
  }
  luckRolltoIncreaseLuck() {
    const luckRoll = this.percentileRoller.rollPercentile();
    const luck = this.getCharacteristic("luck");
    const luckReg = luck.reg;
    const canIncreaseLuck = this.skillChallengeHandler.isFailure(
      luckRoll,
      luckReg
    );
    if (canIncreaseLuck) {
      const luckIncreaseAmount = this.roller.privateRollSingle("d10");
      const newRegLuck = luckReg + luckIncreaseAmount;
      const [halfValue, fifthValue] =
        this.calculateHalfandFifthValues(newRegLuck);
      this.setCharacteristic(
        { reg: newRegLuck, half: halfValue, fifth: fifthValue },
        "luck"
      );
    }
    return [canIncreaseLuck, luckRoll];
  }
  calculateHalfandFifthValues(regValue: number) {
    const halfValue = Math.floor(regValue / 2);
    const fifthValue = Math.floor(regValue / 5);
    return [halfValue, fifthValue];
  }
  getInitiativeObject(): InitiativeInterface {
    return {
      id: v4(),
      investigator_id: this.id,
      round_order: 0,
      status_effects: [],
      dex_modifier: this.characteristics["dex"].reg,
      firearm: { hasFirearm: this.hasFirearm(), needsReload: false },
      isCurrentTurn: false,
      combat_modifier: this.getHighestCombatSkill(),
      name: this.name,
    };
  }
  hasFirearm() {
    let hasFirearm = false;
    this.weapons.forEach((item: Weapon) => {
      if (item.type == "firearm") {
        hasFirearm = true;
      }
    });
    return hasFirearm;
  }
  getHighestCombatSkill() {
    this.combat_skills.sort((skillOne: Skill, skillTwo: Skill) => {
      return skillTwo.reg - skillOne.reg;
    });
    return this.combat_skills[0].reg || 0;
  }
  subtractPowOrMagicPoints(
    cost: number,
    characteristic: Extract<CharacteristicStrings, "pow" | "magic_points">
  ) {
    const characteristicCopy = this.getCharacteristic(characteristic);
    const newRegValue = characteristicCopy.reg - cost;
    characteristicCopy.reg = newRegValue;
    this.setCharacteristic(characteristicCopy, characteristic);
    return this;
  }
  getCharacteristic(value: CharacteristicStrings) {
    return { ...this.characteristics[value] };
  }
  setCharacteristic(
    value: Characteristic,
    characteristic: CharacteristicStrings
  ) {
    this.characteristics[characteristic] = value;
    return this;
  }
  takeDamage(damage: number) {
    const newHp = this.hp - damage;
    this.hp = newHp;
    return this;
  }
  healDamage(healing: number) {
    const newHP = this.hp + healing;
    this.hp = newHP;
    return this;
  }
}
