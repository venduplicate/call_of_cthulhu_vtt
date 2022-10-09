
import { SchemaBase } from "./SchemaBase";
export interface SpellFirestoreInterface extends SchemaBase {
    name: string;
    casting_time: string | number;
    magic_point_cost: string;
    pow_cost: number;
    sanity_cost: string | number;

}

export class SpellSchema {
    id: string;
    name: string;
    casting_time: unknown;
    magic_point_cost: string | number;
    pow_cost: number;
    sanity_cost: string | number;
    constructor(data: SpellFirestoreInterface){
        this.id = data.id;
        this.name = data.name;
        this.magic_point_cost = data.magic_point_cost;
        this.pow_cost = data.pow_cost
        this.sanity_cost = data.sanity_cost
        this.casting_time = data.casting_time;
    }
}

const SpellConverter = {
    toFirestore: function(data:SpellFirestoreInterface){
        return {...data}
    },
    fromFirestore: function(snapshot: FirebaseFirestore.QueryDocumentSnapshot){
        const data = snapshot.data() as SpellFirestoreInterface;
        return new SpellSchema(data);
    }
}
