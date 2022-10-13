import { SonicEmitter } from "../../local-events/sonic.js";
import SessionCustomRoll from "../firestore/CustomRollFirestore.js";
import { SuccessorFailureObject } from "../types";
import { RedisBase } from "./RedisBase.js";
import { CustomRoll } from "../schemas/Roll.js";
import { logger } from "../../utilities/Logging.js";
import type { PlayerObject } from "../schemas/Initiative.js";
import { loggingUtilWrapper } from "../../utilities/Logging.js";
import { customRollHandler } from "../firestore/CustomRollFirestore.js";

export class RollRedis extends RedisBase {
  roll: string;
  constructor() {
    super();
    this.roll = "roll";
  }
  logRoll(sessionId: string, rollData: CustomRoll): SuccessorFailureObject {
    try {
      const key = this.getKey(this.roll, sessionId);
      this.redisClient.rPush(
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
    const rolls = await this.redisClient.lRange(key, 0, -1);
    return rolls;
  }
  async updateFirestoreRolls(sessionId: string, rolls: string[]) {
    for (const record of rolls) {
      const rollData = JSON.parse(record) as CustomRoll;
      const isError = await customRollHandler.updateRoll(
        sessionId,
        rollData.investigatorId,
        rollData
      );
      if (isError.error instanceof Error) {
        logger.alert(isError.error);
      }
    }
  }
  cacheRoll(key: string, rollData: { notation: string; name: string }) {
    try {
      this.redisClient.SET(key, JSON.stringify(rollData));
      this.redisClient.EXPIRE(key, 500);
    } catch (error) {
      logger.alert(error);
    }
  }
  async getCacheRoll(key: string) {
    try {
      const rollData = await this.redisClient.GET(key);
      return rollData;
    } catch (error) {
      logger.alert(error);
      return null;
    }
  }
}

export const rollRedisHandler = loggingUtilWrapper(new RollRedis());
