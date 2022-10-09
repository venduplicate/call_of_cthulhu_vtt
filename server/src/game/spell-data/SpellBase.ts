import {SpellFirestoreInterface,SpellSchema} from "../../data/schemas/Spell.js"
import {roller} from "../../utilities/DiceRoll.js";
import {isNumeric, isString} from "../../utilities/TypeChecking";

class SpellBase extends SpellSchema {
    constructor(data: SpellFirestoreInterface){
        super(data)
    }
    subtract_pow(pow: number) {
        return pow - this.pow_cost;
    }
    subtract_san(sanity: number) {
        if (isString(this.sanity_cost)){
            const roll = roller.privateRoll(this.sanity_cost);
            return sanity - roll
        }
        if (isNumeric(this.sanity_cost)){
            return sanity - this.sanity_cost
        }
    }
    subtract_magic_points(magic_points: number) {
        if (isString(this.magic_point_cost)){
            const roll = roller.privateRoll(this.magic_point_cost);
            return magic_points - roll
        }
        if (isNumeric(this.magic_point_cost)){
            return magic_points - this.magic_point_cost;
        }
    }
}

export default SpellBase
