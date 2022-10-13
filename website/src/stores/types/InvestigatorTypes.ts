import type { list_of_skills } from "../static";
import type { SchemaBase } from "./SchemaBase";
import type { WeaponFirestoreInterface } from "./Weapon";

export interface Base extends SchemaBase {
  name: string;
  player: string;
  occupation: string;
  age: number;
  pronouns: string;
  gender: string;
  residence: string;
  birthplace: string;
}

export type InsanityTypes = "temporary" | "indefinite" | "permanent";

export interface Characteristic {
  reg: number;
  half: number;
  fifth: number;
}

export interface Skill extends Characteristic {
  name: string;
  hasImproved: boolean;
}

export interface BackStory {
  personal_desc: string;
  ideology_beliefs: string;
  significant_people: string;
  meaningful_locations: string;
  treasured_possessions: string;
  traits: string;
  injuries_scars: string;
  phobias_manias: string;
  arcane_tomes_spells_artifacts: string;
  encounters_with_strange_entities: string;
}

export interface Possessions {
  gear_possessions: string;
  cash_assests: {
    spending_level: string;
    cash: string;
    assets: string;
    notes: string;
  };
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

type SkillType = typeof list_of_skills;

export type SkillStrings = SkillType[number];

export type Skills = Map<SkillStrings, Skill>;

export interface InvestigatorFirestore
  extends Base,
    BackStory,
    BackStory,
    Possessions {
  skills: Skills;
  weapons: WeaponFirestoreInterface[];
  characteristics: CharacteristicList;
  total_sanity_loss: number;
  maximum_sanity: number;
  current_sanity: number;
}
