import { SonicEmitter } from "../../local-events/sonic.js";
import SessionCustomRoll from "../firestore/SessionCustomRoll.js";
import { SuccessorFailureObject } from "../types";
import { RedisBase, redisClient } from "./RedisBase.js";
import { CustomRoll } from "../schemas/Roll.js";
import { logger } from "../../utilities/Logging.js";

export class RollRedis extends RedisBase {
  roll: string;
  constructor(sonic: SonicEmitter) {
    super(sonic);
    this.roll = "roll";
  }
  logRoll(sessionId: string, rollData: CustomRoll): SuccessorFailureObject {
    try {
      const key = this.getKey(this.roll, sessionId);
      redisClient.rPush(
        key,
        JSON.stringify({
          id: rollData.id,
          investigatorId: rollData.investigatorId,
          roll: rollData.notation,
          name: rollData.name,
        })
      );
      this.setExpire(key);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async getRollLogs(sessionId: string) {
    const key = this.getKey(this.roll, sessionId);
    const rolls = await redisClient.lRange(key, 0, -1);
    return rolls;
  }
  async updateFirestoreRolls(sessionId: string,rolls: string[]) {
    this.sonic.emit(
        "getCustomRollFirestore",
        async (customRoll: SessionCustomRoll) => {
          for (const record of rolls) {
            const rollData = JSON.parse(record) as CustomRoll;
            const isError = await customRoll.updateRoll(sessionId,rollData.investigatorId,rollData)
            if (isError.error instanceof Error){
                logger.alert(isError.error)
            }
          }
        }
      );
  }
}
