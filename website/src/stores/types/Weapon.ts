import type { Characteristic } from "./InvestigatorTypes";
import type { SchemaBase } from "./SchemaBase";

export interface WeaponFirestoreInterface extends SchemaBase {
  name: string;
  skill: string;
  damage: string;
  range_type: string;
  base_range: number;
  uses_per_round: number;
  cost_1920: number;
  cost_modern: number;
  common_era: string[];
}

type WeaponTypes =
  | "none"
  | "firearm"
  | "fighting"
  | "throw"
  | "artillery"
  | "unnarmed"
  | "demolitions"
  | "electrical repair";

export interface WeaponFirestoreInterface extends Characteristic {
  type: WeaponTypes;
  name: string;
  skill: string;
  damage: string;
  range_type: string;
  base_range: number;
  uses_per_round: number;
  cost_1920: number;
  cost_modern: number;
  common_era: string[];
}

export class WeaponSchema {
  id: string;
  name: string;
  skill: string;
  damage: string;
  range_type: string;
  base_range: number;
  uses_per_round: number;
  cost_1920: number;
  cost_modern: number;
  common_era: string[];
  type: WeaponTypes;
  constructor(data: WeaponFirestoreInterface) {
    this.id = data.id;
    this.name = data.name;
    this.skill = data.skill;
    this.damage = data.damage;
    this.range_type = data.range_type;
    this.base_range = data.base_range;
    this.uses_per_round = data.uses_per_round;
    this.cost_1920 = data.cost_1920;
    this.cost_modern = data.cost_modern;
    this.common_era = data.common_era;
    this.type = data.type;
  }
}
