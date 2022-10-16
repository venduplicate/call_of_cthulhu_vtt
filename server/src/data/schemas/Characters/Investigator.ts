import {
  CharacteristicList,
  Skill,
  Skills,
  CharacterBase,
  Weapon,
} from "./CharacterBase";

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

export interface InvestigatorInterface
  extends BackStory,
    BackStory,
    Possessions,
    CharacterBase {
  skills: Skills;
  weapons: Weapon[];
  characteristics: CharacteristicList;
  total_sanity_loss: number;
  maximum_sanity: number;
  current_sanity: number;
  combat_skills: Skill[];
}

export class InvestigatorSchema extends CharacterBase {
  gear_possessions: string;
  cash_assests: {
    spending_level: string;
    cash: string;
    assets: string;
    notes: string;
  };
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
  constructor(data: InvestigatorInterface) {
    super(data);
    this.residence = data.residence;
    this.birthplace = data.birthplace;
    this.characteristics = data.characteristics;
    this.gear_possessions = data.gear_possessions;
    this.cash_assests = data.cash_assests;
    this.personal_desc = data.personal_desc;
    this.ideology_beliefs = data.ideology_beliefs;
    this.significant_people = data.significant_people;
    this.meaningful_locations = data.meaningful_locations;
    this.treasured_possessions = data.treasured_possessions;
    this.traits = data.traits;
    this.injuries_scars = data.injuries_scars;
    this.phobias_manias = data.phobias_manias;
    this.arcane_tomes_spells_artifacts = data.arcane_tomes_spells_artifacts;
    this.encounters_with_strange_entities =
      data.encounters_with_strange_entities;
  }
}
