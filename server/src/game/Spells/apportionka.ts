import { SpellInterface} from "../../data/schemas/Spell";
import SpellBase from "./SpellBase"

export class ApportionKa extends SpellBase {
    constructor(data: SpellInterface){
        super(data)
    }
    cast(pow: number, sanity: number, magic_points: number, num_organs: number) {
        return {pow: this.subtract_pow(pow), sanity: this.subtract_san(sanity), magic_points: this.subtract_magic_points(magic_points), days_to_cast: num_organs}
    }
}

