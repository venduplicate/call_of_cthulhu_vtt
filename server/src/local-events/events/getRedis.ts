import {redisClient} from "../../data/redis/RedisAccess.js";


module.exports = {
  name: "getRedis",
  once: false,
  async execute(callback: (client: typeof redisClient) => void) {
    callback(redisClient)
  },
};