import DBBase from "../DBBase";

export class BaseStatic extends DBBase {
    constructor(){
        super()
    }
    get collectionString(){
        return "static"
    }
}