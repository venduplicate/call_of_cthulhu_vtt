import type { SchemaBase } from "./SchemaBase";
import type { WeaponMap } from "./Weapon";
import type { CharacteristicList } from "./Characteristics";
import type { ServerSkills } from "./Skills";
import type { SanityInterface } from "../types/Characteristics";
import type { PlayerBaseInterface } from "./PlayerBase";

export interface BaseCharacterInterface
  extends SchemaBase,
    PlayerBaseInterface {
  name: string;
  occupation: string;
  age: number;
  controlledById: string;
  gender: string;
  pronouns: string;
  birthplace: string;
}

export type InsanityTypes = "temporary" | "indefinite" | "permanent";

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

export interface HealthInteface {
  hpCurrent: number;
  hpMax: number;
}


// there is a difference between firestore data and our class data
// so the data most likely will need to be formatted before hand. 
export interface InvestigatorInterface extends BaseCharacterInterface {
  skills: ServerSkills;
  weapons: WeaponMap;
  characteristics: CharacteristicList;
  sanity: SanityInterface;
  backstory: BackStory;
  posessions: Possessions;
  health: HealthInteface;
}
