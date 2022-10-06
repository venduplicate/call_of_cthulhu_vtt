import { DiceRoller } from "@dice-roller/rpg-dice-roller";

export interface Investigator {
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


