
import { DiceRoller } from "@dice-roller/rpg-dice-roller";
import { SchemaBase } from "./SchemaBase";

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

export interface Characteristic {
    reg: number;
    half: number;
    fifth: number;
}

export interface Skill extends Characteristic {
    name: string;
    hasImproved: boolean;
}

export interface Weapon extends Characteristic {
    name: string;
    damage: string;
    range: string;
    attacks: number;
    ammo: number;
    malf: string;
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
    cash_assests: { spending_level: string, cash: string, assets: string, notes: string }
}

export interface InvestigatorFirestore extends Base, BackStory, BackStory, Possessions {
    skills: Skill[]
    weapons: Weapon[]
    characteristics: Characteristic[]
}

export class InvestigatorSchema implements InvestigatorFirestore {
    id: string;
    name: string;
    player: string;
    occupation: string;
    age: number;
    pronouns: string;
    gender: string;
    residence: string;
    birthplace: string;
    characteristics: Characteristic[];
    skills: Skill[]
    weapons: Weapon[];
    gear_possessions: string;
    cash_assests: { spending_level: string, cash: string, assets: string, notes: string }
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
    constructor(data: InvestigatorFirestore) {
        this.id = data.id;
        this.name = data.name;
        this.player = data.player;
        this.age = data.age;
        this.occupation = data.occupation;
        this.pronouns = data.pronouns;
        this.gender = data.gender;
        this.residence = data.residence;
        this.birthplace = data.birthplace;
        this.characteristics = data.characteristics;
        this.skills = data.skills;
        this.weapons = data.weapons;
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
        this.encounters_with_strange_entities = data.encounters_with_strange_entities;
    }
}

export const InvestigatorConverter = {
    toFirestore: function(data: InvestigatorFirestore){
        return {...data}
    },
    fromFirestore: function(snapshot: FirebaseFirestore.QueryDocumentSnapshot){
        const data = snapshot.data();
        if (data == undefined) return
        return new InvestigatorSchema(data as InvestigatorFirestore);
    }
}


