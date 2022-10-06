import BaseSpell from "./spell"

class ApportionKa extends BaseSpell {
    sanity_cost: string
    constructor(){
        super()
        this.name = "Apportion Ka"
        this.pow_cost = 5;
        this.sanity_cost = "2d10";
        this.magic_point_cost = 10;
        this.casting_time = "1 day per organ";
    }
    cast(pow: number, sanity: number, magic_points: number, num_organs: number) {
        return {pow: this.subtract_pow(pow), sanity: this.subtract_san(sanity), magic_points: this.subtract_magic_points(magic_points), days_to_cast: num_organs}
    }
}

const ApportionKa_Spell = new ApportionKa();

export {ApportionKa, ApportionKa_Spell}