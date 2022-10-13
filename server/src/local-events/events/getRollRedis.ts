import { RollRedis, rollRedisHandler } from "../../data/redis/RollRedis";

export default {
  name: "getRedis",
  once: false,
  async execute(callback: (client: RollRedis) => void) {
    callback(rollRedisHandler);
  },
};