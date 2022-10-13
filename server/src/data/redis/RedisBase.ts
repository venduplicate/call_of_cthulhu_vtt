import { createClient } from "redis";
import { logger } from "../../utilities/Logging.js";
import * as dotenv from "dotenv";
import { SuccessorFailureObject } from "../types";
import { SonicEmitter } from "../../local-events/sonic.js";
dotenv.config({
  path: "c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env",
});

const redisURL = process.env.REDISCLOUD_URL;

export function redisInit() {
  const client = createClient({
    url: redisURL,
  });
  client.connect();
  client.on("error", (err: any) => logger.alert(err));
  return client;
}

export const redisClient = redisInit();

export class RedisBase {
  redisClient: typeof redisClient;
  expirationInSeconds: number;
  nearExpiration: number;
  sonic: SonicEmitter;
  constructor(sonic: SonicEmitter) {
    this.redisClient = redisClient;
    this.expirationInSeconds = 1800;
    this.nearExpiration = 100;
    this.sonic = sonic;
  }
  getKey(key: string, id: string) {
    return `${id}-${key}`;
  }
  async setExpire(key: string): Promise<SuccessorFailureObject> {
    try {
      await this.redisClient.EXPIRE(key, this.expirationInSeconds);
      return { error: null, success: true };
    } catch (error) {
      return { error: error, success: false };
    }
  }
  async getTTL(key: string) {
    try {
      const ttl = await this.redisClient.TTL(key);
      return ttl;
    } catch (error) {
      return 0;
    }
  }
  async isExpiring(key: string) {
    try {
      const ttl = await this.getTTL(key);
      if (ttl < this.nearExpiration && ttl > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }
}
