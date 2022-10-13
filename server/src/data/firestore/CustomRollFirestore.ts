import { SessionBase } from "./SessionBase.js";
import { CustomRoll, RollConverter } from "../schemas/Roll.js";
import { logger } from "../../utilities/Logging.js";
import { v4 } from "uuid";
import { loggingUtilWrapper } from "../../utilities/Logging.js";

export class CustomRollFireStore extends SessionBase {
  custom_rolls: string;
  converter: typeof RollConverter;
  constructor() {
    super();
    this.custom_rolls = "custom_rolls";
    this.converter = RollConverter;
  }
  getRollRef(sessionId: string) {
    return this.getSessionRef(sessionId).collection(this.custom_rolls);
  }
  getInvestigatorRollRef(sessionId: string, investigatorId: string) {
    return this.getRollRef(sessionId).doc(investigatorId);
  }
  async getAllRolls(sessionId: string, investigatorId: string) {
    try {
      const rollRef = this.getInvestigatorRollRef(
        sessionId,
        investigatorId
      ).collection(this.custom_rolls);
      const rollData = await this.getCollectionData(rollRef);
      return { ...rollData };
    } catch (error) {
      logger.alert(error);
      return undefined;
    }
  }
  async updateRoll(
    sessionId: string,
    investigatorId: string,
    rollData: CustomRoll
  ) {
    try {
      const rollRef = this.getInvestigatorRollRef(sessionId, investigatorId)
        .collection(this.custom_rolls)
        .doc(rollData.id);
      this.setDocData(this.converter, rollRef, rollData);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async deleteRoll(sessionId: string, investigatorId: string, rollId: string) {
    try {
      const rollRef = this.getInvestigatorRollRef(sessionId, investigatorId)
        .collection(this.custom_rolls)
        .doc(rollId);
      this.deleteDocData(rollRef);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async addRoll(sessionId: string, rollData: CustomRoll) {
    try {
      rollData.id = v4();
      const ref = this.getInvestigatorRollRef(
        sessionId,
        rollData.investigatorId
      );
      this.setDocData(RollConverter, ref, rollData);
      return true;
    } catch (error) {
      logger.alert(error);
      return error;
    }
  }
}

export const customRollHandler = loggingUtilWrapper(new CustomRollFireStore());
