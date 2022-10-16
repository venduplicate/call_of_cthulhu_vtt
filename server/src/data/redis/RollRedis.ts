import { SuccessorFailureObject } from "../types";
import { RedisBase } from "./RedisBase.js";
import { CustomRoll, RollLog } from "../schemas/Roll.js";
import { logger } from "../../utilities/Logging.js";
import { loggingUtilWrapper } from "../../utilities/Logging.js";

export class RollRedis extends RedisBase {
  name: string;
  constructor() {
    super();
    this.name = "roll";
  }
  getRollKey(sessionId: string) {
    return `${sessionId}:${this.name}`;
  }
  logRoll(sessionId: string, rollData: RollLog): SuccessorFailureObject {
    try {
      const key = this.getKey(this.name, sessionId);
      this.redisClient.rPush(
        key,
        JSON.stringify({
          id: rollData.id,
          roll: rollData.roll,
          comment: rollData.comment ? rollData.comment : "",
        })
      );
      this.setExpire(key);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async getRollLogs(sessionId: string) {
    const key = this.getKey(this.name, sessionId);
    const rolls = await this.redisClient.lRange(key, 0, -1);
    return rolls;
  }
  // async updateFirestoreRolls(sessionId: string, rolls: string[]) {
  //   for (const record of rolls) {
  //     const rollData = JSON.parse(record) as CustomRoll;
  //     const isError = await customRollHandler.updateRoll(
  //       sessionId,
  //       rollData.investigatorId,
  //       rollData
  //     );
  //     if (isError.error instanceof Error) {
  //       logger.alert(isError.error);
  //     }
  //   }
  // }
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
