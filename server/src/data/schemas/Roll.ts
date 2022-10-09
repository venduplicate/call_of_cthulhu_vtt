import { SchemaBase } from "./SchemaBase";

export interface CustomRoll extends SchemaBase {
    notation: string;
    name: string;
}

export class RollSchema implements CustomRoll {
    id: string;
    notation: string;
    name: string;
    constructor(id: string, name: string, notation: string){
        this.id = id;
        this.notation = notation;
        this.name = name;
    }
}


export const RollConverter = {
    toFirestore: function(data: CustomRoll){
        return {...data}
    },
    fromFirestore: function(snapshot: FirebaseFirestore.QueryDocumentSnapshot){
        const {name,id,notation} = snapshot.data() as CustomRoll;
        return new RollSchema(name,id,notation);
    }
}