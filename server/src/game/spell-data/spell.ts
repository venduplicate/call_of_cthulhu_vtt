import {DiceRoll, DiceRoller} from "@dice-roller/rpg-dice-roller";

class BaseSpell {
    name: string;
    casting_time: unknown;
    magic_point_cost: number;
    pow_cost: number;
    sanity_cost: string | number;
    roller: DiceRoller;
    constructor(){
        this.name = ""
        this.magic_point_cost = 0;
        this.pow_cost = 0;
        this.sanity_cost = 0;
        this.roller = new DiceRoller();
    }
    subtract_pow(pow: number) {
        return pow - this.pow_cost;
    }
    subtract_san(sanity: number) {
        if (typeof this.sanity_cost === "string"){
            const roll = this.roller.roll(this.sanity_cost) as DiceRoll;
            return sanity - roll.total;
        }
        if (typeof this.sanity_cost === "number"){
            return sanity - this.sanity_cost;
        }
    }
    subtract_magic_points(magic_points: number) {
        return magic_points - this.magic_point_cost;
    }
}

export default BaseSpell
