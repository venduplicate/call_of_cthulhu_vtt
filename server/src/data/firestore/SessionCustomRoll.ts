import { SessionBase } from "./SessionBase.js"
import { RollSchema, CustomRoll, RollConverter } from "../schemas/Roll.js";
import { logger } from "@/utilities/Logging.js";

export default class SessionCustomRoll extends SessionBase {
    custom_rolls: string;
    constructor() {
        super()
        this.custom_rolls = "custom_rolls"
    }
    getRollRef(sessionId: string) {
        return this.getSessionRef(sessionId).collection(this.custom_rolls)
    }
    getInvestigatorRollRef(sessionId: string, investigatorId: string) {
        return this.getRollRef(sessionId).doc(investigatorId)
    }
    async getAllRolls(sessionId: string, investigatorId: string) {
        try {
            const rollRef = this.getInvestigatorRollRef(sessionId, investigatorId).collection(this.custom_rolls)
            const rollData = await this.getCollectionData(rollRef);
            return { ...rollData };
        }
        catch (error) {
            logger.alert(error)
            return undefined
        }
    }
    async updateRoll(sessionId: string, investigatorId: string, rollData: CustomRoll) {
        try {
            const rollRef = this.getInvestigatorRollRef(sessionId, investigatorId).collection(this.custom_rolls).doc(rollData.id)
            this.setDocData(RollConverter,rollRef,rollData)
            return { error: null, success: true }
        }
        catch (error) {
            return { error: error, success: false }
        }
    }
    async deleteRoll(sessionId: string, investigatorId: string, rollId: string) {
        try {
            const rollRef = this.getInvestigatorRollRef(sessionId, investigatorId).collection(this.custom_rolls).doc(rollId)
            this.deleteDocData(rollRef);
            return { error: null, success: true }
        }
        catch (error) {
            return { error: error, success: false }
        }
    }

}