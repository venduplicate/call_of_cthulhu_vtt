import {SpellInterface,SpellSchema} from "../../data/schemas/Spell.js"
import {diceRoller} from "../../utilities/DiceRoll.js";
import {isNumeric, isString} from "../../utilities/TypeChecking";

class SpellBase extends SpellSchema {
    constructor(data: SpellInterface){
        super(data)
    }
    subtract_pow(pow: number) {
        return pow - this.pow_cost;
    }
    subtract_san(sanity: number) {
        if (isString(this.sanity_cost)){
            const roll = diceRoller.privateRollSingle(this.sanity_cost);
            return sanity - roll
        }
        if (isNumeric(this.sanity_cost)){
            return sanity - this.sanity_cost
        }
    }
    subtract_magic_points(magic_points: number) {
        if (isString(this.magic_point_cost)){
            const roll = diceRoller.privateRollSingle(this.magic_point_cost);
            return magic_points - roll
        }
        if (isNumeric(this.magic_point_cost)){
            return magic_points - this.magic_point_cost;
        }
    }
}

const SpellSymbols = [Symbol.for("subtract_pow"),Symbol.for("subtract_san"),Symbol.for("subtract_magic_points")]

const SpellFunctions = {
    subtract_pow: function (pow: number,pow_cost: number) {
        return pow - pow_cost;
    },
    subtract_san: function(sanity: number,sanity_cost: number) {
        if (isString(sanity_cost)){
            const roll = diceRoller.privateRollSingle(sanity_cost);
            return sanity - roll
        }
        if (isNumeric(sanity_cost)){
            return sanity - sanity_cost
        }
    },
    subtract_magic_points(magic_points: number, magic_point_cost: number) {
        if (isString(magic_point_cost)){
            const roll = diceRoller.privateRollSingle(magic_point_cost);
            return magic_points - roll
        }
        if (isNumeric(magic_point_cost)){
            return magic_points - magic_point_cost;
        }
    }
}



export default SpellBase
