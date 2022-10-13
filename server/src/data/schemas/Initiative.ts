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

export class InitiativeSchema implements InitiativeInterface {
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
}

export function initiativeSchemaToOjbect(data: InitiativeSchema) {
  const dataObject = {
    id: data.id,
    player_id: data.player_id,
    status_effects: data.status_effects,
    dex_modifier: data.dex_modifier,
    firearm: data.firearm,
    isCurrentTurn: data.isCurrentTurn,
    combat_modifier: data.combat_modifier,
    round_order: data.round_order,
  };
  return dataObject as InitiativeInterface;
}

export const InitiativeConverter = {
  toFirestore: function (data: InitiativeInterface) {
    return { ...data };
  },
  fromFirestore: function (snapshot: FirebaseFirestore.QueryDocumentSnapshot) {
    const data = snapshot.data();
    return new InitiativeSchema(data as InitiativeInterface);
  },
};
