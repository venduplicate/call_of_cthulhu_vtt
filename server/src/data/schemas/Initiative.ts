import { SchemaBase } from "./SchemaBase";

interface StatusEffectInterface extends SchemaBase {
    name: string;
    source: string;
    description: string;
}

interface InitiativeModifier extends SchemaBase {
    modifier_number: number;
    source: string;
}

export interface InitiativeInterface extends SchemaBase {
    player_id: string;
    round_order: number;
    status_effects: StatusEffectInterface[];
    initiative_base: number;
    modifiers: InitiativeModifier[]
}

export class InitiativeSchema {
    id: string;
    player_id: string;
    round_order: number;
    status_effects: StatusEffectInterface[];
    initiative_base: number;
    modifiers: InitiativeModifier[]
    constructor(data: InitiativeInterface){
        this.id = data.id;
        this.player_id = data.player_id;
        this.round_order = data.round_order;
        this.status_effects = data.status_effects;
        this.initiative_base = data.initiative_base;
        this.modifiers = data.modifiers;
    }
}

export const InitiativeConverter = {
    toFirestore: function(data: InitiativeInterface){
        return {...data}
    },
    fromFirestore: function(snapshot: FirebaseFirestore.QueryDocumentSnapshot){
        const data = snapshot.data();
        if (data == undefined) return
        return new InitiativeSchema(data as InitiativeInterface);
    }
}