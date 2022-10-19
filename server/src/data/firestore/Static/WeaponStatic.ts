import { WeaponBaseFromFirestore, WeaponFirestoreBaseSchema } from "../../schemas/Characters/WeaponSchema";
import { FirebaseConverter } from "../Converter";
import { BaseStatic } from "./BaseStatic";

export class WeaponStatic extends BaseStatic {
    constructor(){
        super()
    }
    async retrieveWeapon(weaponId: string){
        const ref = this.getDocRef(this.baseRef,weaponId)
        const docData = await this.getDocData(FirebaseConverter<WeaponBaseFromFirestore>(),ref)
        return docData;
    }
}