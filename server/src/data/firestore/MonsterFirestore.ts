import DBBase from "./DBBase";
import { MonsterConverter, MonsterSchema } from "../schemas/Monster";
import { SuccessorFailureObject } from "../types";
export class MonsterFirestore extends DBBase {
    monsters: string;
    constructor(){
        super()
        this.monsters = "monsters"
    }
    getMonsterRef(){
        return this.db.collection(this.monsters)
    }
    getMonsterData(id: string) {
        try {
            const ref = this.getMonsterRef().doc(id)
            const data = this.getDocData(MonsterConverter,ref)
            return data;
        }
        catch(error){
            return undefined;
        }
    }
}