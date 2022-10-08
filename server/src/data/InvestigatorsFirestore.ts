
import {SessionBase} from "./SessionBase"
export class InvestigatorFirestore extends SessionBase {
    constructor(){
        super()
        this.name = "players"
    }
    getPlayersRef(sessionId: string){
        return this.getSessionRef(sessionId).collection(this.name)
    }
}