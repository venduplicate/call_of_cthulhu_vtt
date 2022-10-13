import {redisClient} from "../../data/redis/RedisBase.js";


export default {
  name: "getRedis",
  once: false,
  async execute(callback: (client: typeof redisClient) => void) {
    callback(redisClient)
  },
};