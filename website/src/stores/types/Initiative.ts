import type { SchemaBase } from "./SchemaBase";
import type { StatusEffect } from "../Character/StatusEffectHandler";
import type { InitiativeRecordHandler } from "../Character/CharacterInitiativeHandler";
export interface StatusEffectInterface extends SchemaBase {
  name: string;
  source: string;
  description: string;
}

export type StatusEffectMap = Map<string, StatusEffect>;

export interface FirearmCombatStats {
  hasFirearm: boolean;
  needsReload: boolean;
}

export interface InitiativeInterface extends SchemaBase {
  roundOrder: number;
  playerId: string;
  statusEffects: StatusEffectMap;
  dexModifier: number;
  firearm: FirearmCombatStats;
  isCurrentTurn: boolean;
  combatModifier: number;
  playerName: string;
}

export type InitiativeMap = Map<number, InitiativeRecordHandler>;
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

export type InitiativeOrderFunction = (roundOrder: number) => void;
