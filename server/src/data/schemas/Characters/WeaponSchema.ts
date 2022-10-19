import { SchemaBase } from "../SchemaBase";
import { Skill } from "./CharacterBase";

type WeaponTypes =
    | "firearm"
    | "fighting"
    | "throw"
    | "artillery"
    | "unnarmed"
    | "demolitions"
    | "electrical repair";

export interface WeaponFromCharacterFirestore {
    weaponReference: string;
    currentAmmo: number;
    isMalfunctioning: boolean;

}
export class WeaponCharacterDataSchema {
    weaponReference: string;
    currentAmmo: number;
    isMalfunctioning: boolean;
    constructor(data: WeaponFromCharacterFirestore) {
        this.weaponReference = data.weaponReference;
        this.currentAmmo = data.currentAmmo;
        this.isMalfunctioning = data.isMalfunctioning;
    }
}

export interface WeaponBaseFromFirestore extends SchemaBase {
    name: string;
    type: string;
    subType: string;
    skill: Skill;
    damageNotation: string;
    range: number;
    rangeMeasurement: string;
    attacks: number; // how do we interpret 1(2) or full auto?
    ammoMax: number;
    malfunction: number;
}

export class WeaponFirestoreBaseSchema {
    id: string;
    name: string;
    type: string;
    subType: string;
    skill: Skill;
    damageNotation: string;
    range: number;
    rangeMeasurement: string;
    attacks: number; // how do we interpret 1(2) or full auto?
    ammoMax: number;
    malfunction: number;
    constructor(data: WeaponBaseFromFirestore) {
        this.id = data.id;
        this.name = data.name;
        this.subType = data.subType;
        this.type = data.type;
        this.skill = data.skill;
        this.damageNotation = data.damageNotation;
        this.range = data.range;
        this.rangeMeasurement = data.rangeMeasurement;
        this.attacks = data.attacks;
        this.ammoMax = data.ammoMax
        this.malfunction = data.malfunction;
    }

}


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


export class WeaponSchema {
    id: string;
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
    constructor(data: WeaponInterface) {
        this.id = data.id;
        this.name = data.name;
        this.subType = data.subType;
        this.type = data.type;
        this.skill = data.skill;
        this.damageNotation = data.damageNotation;
        this.range = data.range;
        this.rangeMeasurement = data.rangeMeasurement;
        this.attacks = data.attacks;
        this.ammoMax = data.ammoMax
        this.ammoCurrent = data.ammoCurrent;
        this.malfunction = data.malfunction;
        this.damageBonus = data.damageBonus;
        this.isMalfunctioning = data.isMalfunctioning;
    }

}