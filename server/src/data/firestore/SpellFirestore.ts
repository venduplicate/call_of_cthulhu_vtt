import { SpellConverter } from "../schemas/Spell";
import DBBase from "./DBBase";

export class SpellFirestore extends DBBase {
    spells: string;
    constructor(){
        super()
        this.spells = "spells"
    }
    getSpellRef(){
        return this.db.collection(this.spells)
    }
    getSpellData(id: string) {
        try {
            const ref = this.getSpellRef().doc(id)
            const data = this.getDocData(SpellConverter,ref)
            return data;
        }
        catch(error){
            return undefined;
        }
    }
}