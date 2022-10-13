import { SonicEmitter } from "../../local-events/sonic.js";
import { RedisBase } from "./RedisBase.js";

export class InitiativeRedis extends RedisBase {
  initiative: string;
  constructor(sonic: SonicEmitter) {
    super(sonic);
    this.initiative = "initiative";
  }
  getInitiative() {
    console.log("test")
  }
}
