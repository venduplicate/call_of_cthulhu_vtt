import DBBase from "../DBBase";

export class BaseStatic extends DBBase {
    constructor(){
        super()
    }
    get baseRef(){
        return this.db.collection("static");
    }
}