import { RollRedis } from "../../data/redis/RollRedis";
import sonic from "../sonic";

export default {
  name: "getRollLogs",
  once: false,
  async execute(sessionId: string, callback: (logs: string[]) => void) {
    sonic.emit("getRollRedis", async (rollRedisHandler: RollRedis) => {
      const rollLogs = await rollRedisHandler.getRollLogs(sessionId);
      callback(rollLogs);
    });
  },
};
