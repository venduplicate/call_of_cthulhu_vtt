import { list_of_skills } from "../../../game/static/skills";
import {
  DiceHandler,
  percentileRoller,
  PercentileRollerHandler,
  diceRoller,
  skillChallengeHandler,
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
    this.roller = diceRoller;
    this.percentileRoller = percentileRoller;
    this.skillChallengeHandler = skillChallengeHandler;
    this.combat_skills = data.combat_skills ? data.combat_skills : [];
    this.hp = data.hp;
    this.move = data.move;
  }
}
