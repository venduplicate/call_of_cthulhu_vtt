import type { SchemaBase } from "./SchemaBase";

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
  round_order: number;
  player_id: string;
  status_effects: StatusEffectInterface[];
  dex_modifier: number;
  firearm: FirearmCombatStats;
  isCurrentTurn: boolean;
  combat_modifier: number;
}

export type InitiativeMap = Map<number, InitiativeInterface>;
export type InitiativeArray = Array<InitiativeInterface>;

export function isInitiativeArray(
  data: InitiativeMap | InitiativeArray
): data is InitiativeArray {
  return (data as InitiativeArray).length !== null;
}

export function isInitiativeMap(
  data: InitiativeMap | InitiativeArray
): data is InitiativeMap {
  return (data as InitiativeMap).size !== null;
}

export class InitiativeSchema {
  id: string;
  round_order: number;
  player_id: string;
  status_effects: StatusEffectInterface[];
  dex_modifier: number;
  firearm: FirearmCombatStats;
  isCurrentTurn: boolean;
  combat_modifier: number;
  constructor(data: InitiativeInterface) {
    this.id = data.id;
    this.round_order = data.round_order;
    this.player_id = data.player_id;
    this.status_effects = data.status_effects;
    this.dex_modifier = data.dex_modifier;
    this.firearm = data.firearm;
    this.isCurrentTurn = data.isCurrentTurn;
    this.combat_modifier = data.combat_modifier;
  }
  toObject() {
    const dataObject = {
      id: this.id,
      player_id: this.player_id,
      status_effects: this.status_effects,
      dex_modifier: this.dex_modifier,
      firearm: this.firearm,
      isCurrentTurn: this.isCurrentTurn,
      combat_modifier: this.combat_modifier,
      round_order: this.round_order,
    };
    return dataObject as InitiativeInterface;
  }
}
