import { RedisBase } from "./RedisBase.js";
import { loggingUtilWrapper } from "../../utilities/Logging.js";
export class InitiativeRedis extends RedisBase {
  initiative: string;
  constructor() {
    super();
    this.initiative = "initiative";
  }
  getInitiative() {
    console.log("test");
  }
}

export const initiativeRedisHandler = loggingUtilWrapper(new InitiativeRedis());
