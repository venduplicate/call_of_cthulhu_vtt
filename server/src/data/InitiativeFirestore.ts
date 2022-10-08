import {SessionBase} from "./SessionBase"
export class InitiativeFirestore extends SessionBase {
    constructor(){
        super()
        this.name = "initiative"
    }
    getInitiativeRef(sessionId: string){
        return this.getSessionRef(sessionId).collection(this.name)
    }
}