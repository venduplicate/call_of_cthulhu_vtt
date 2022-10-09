import { loggingUtilWrapper } from "@/utilities/Logging.js";
import {SessionBase} from "./SessionBase.js"
import { SuccessorFailureObject } from "../types.js";
import { InitiativeConverter, InitiativeInterface, InitiativeSchema } from "../schemas/Initiative.js";

export class InitiativeFirestore extends SessionBase {
    initiative: string;
    constructor(){
        super()
        this.initiative = "initiative"
    }
    getInitiativeRef(sessionId: string){
        return this.getSessionRef(sessionId).collection(this.initiative)
    }
    async getAllInitiative(sessionId: string){
        const ref = this.getInitiativeRef(sessionId)
        const initData = await this.getCollectionData(ref)

        return {...initData}
    }
    async updateOneInitiative(sessionId: string, docId: string, data: InitiativeInterface): Promise<SuccessorFailureObject>{
        try {
            const ref = this.getInitiativeRef(sessionId).doc(docId);
            await this.setDocData(InitiativeConverter,ref,new InitiativeSchema(data))
            return {error: null, success: true}
        }
        catch(error){
            return {error: error, success: false}
        }
    }
    async updateAllInitiative(sessionId: string, data: InitiativeInterface[]): Promise<SuccessorFailureObject>{
        try {
            const ref = this.getInitiativeRef(sessionId)
            this.setBatchData(ref,data)
            return {error: null, success: true}
        }
        catch(error){   
            return {error: error, success: false}
        }
    }
    async deleteAllInitiative(sessionId: string,data: InitiativeInterface[]): Promise<SuccessorFailureObject>{
        try {
            const ref = this.getInitiativeRef(sessionId);
            this.deleteBatchData(ref,data);
            return {error: null,success: true}
        }
        catch(error){
            return {error: error, success: false}
        }
    }
}

export const initiativeHandler = loggingUtilWrapper(new InitiativeFirestore());