import { UserBase } from "./UserBase.js";
import { loggingUtilWrapper } from "@/utilities/Logging.js";
import { SuccessorFailureObject } from "../types.js";
import { InvestigatorSchema, InvestigatorConverter, InvestigatorFirestore } from "../schemas/Investigator.js";


export class InvestigatorFirestoreClass extends UserBase {
    investigators: string
    constructor(){
        super()
        this.investigators = "investigators"
    }
    getInvestigatorsRef(userId: string){
        return this.getUserRef(userId).collection(this.investigators)
    }
    async getSingleInvestigator(userId: string, investigatorId: string){
        const ref = this.getInvestigatorsRef(userId).doc(investigatorId)
        const docData = await this.getDocData(InvestigatorConverter,ref);

        return {...docData.data()}
    }
    async updateInvestigator(userId: string, investigatorData: InvestigatorFirestore): Promise<SuccessorFailureObject> {
        const ref = this.getInvestigatorsRef(userId).doc(investigatorData.id);
        try {
            await this.setDocData(InvestigatorConverter,ref,new InvestigatorSchema(investigatorData))
            return {error: null, success: true}
        }
        catch(error){
            return {error: error, success: false}
        }
    }
    async deleteInvestigator(userId: string,investigatorId: string): Promise<SuccessorFailureObject> {
        try {
            const ref = this.getInvestigatorsRef(userId).doc(investigatorId);
            await this.deleteDocData(ref)
            return {error: null, success:true}
        }
        catch(error){
            return {error: error, success: false}
        }
        
    }
}

export const investigatorHandler = loggingUtilWrapper(new InvestigatorFirestoreClass());
