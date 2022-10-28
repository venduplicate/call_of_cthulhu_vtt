import { SchemaBase } from "./SchemaBase";

interface StatusEffectInterface extends SchemaBase {
  name: string;
  source: string;
  description: string;
}

interface FirearmCombatStats {
  hasFirearm: boolean;
  needsReload: boolean;
}

export interface InitiativeInterface extends SchemaBase {
  name: string;
  round_order: number;
  investigator_id: string;
  status_effects: StatusEffectInterface[];
  dex_modifier: number;
  firearm: FirearmCombatStats;
  isCurrentTurn: boolean;
  combat_modifier: number;
}

export interface InitiativeFunctionsInterface {
  getFirestoreId: () => string;
  getInvestigatorname: () => string;
  getRoundOrder: () => number;
  setRoundOrder: (value: number) => InitiativeSchema;
  getStatusEffects: () => StatusEffectInterface[];
  addStatusEffect: (value: StatusEffectInterface) => InitiativeSchema;
  getDexModifier: () => number;
  getFirearmStats: () => FirearmCombatStats;
  getIsCurrent: () => boolean;
  setIsCurrent: (value: boolean) => InitiativeSchema;
  getCombatModifier: () => number;
}

export type InitiativeMap = Map<number, InitiativeInterface>;
export type InitiativeArray = Array<InitiativeInterface>;

export type PlayerObject = { investigatorId: string; name: string };

export type PlayerArray = Array<PlayerObject>;
export default class InitiativeSchema {
  investigator_name: string;
  id: string;
  round_order: number;
  investigator_id: string;
  status_effects: StatusEffectInterface[];
  dex_modifier: number;
  firearm: FirearmCombatStats;
  isCurrentTurn: boolean;
  combat_modifier: number;
  constructor(data: InitiativeInterface) {
    this.investigator_name = data.name;
    this.id = data.id;
    this.round_order = data.round_order;
    this.investigator_id = data.investigator_id;
    this.status_effects = data.status_effects;
    this.dex_modifier = data.dex_modifier;
    this.firearm = data.firearm;
    this.isCurrentTurn = data.isCurrentTurn;
    this.combat_modifier = data.combat_modifier;
  }
}