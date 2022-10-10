import { SonicEmitter } from "@/local-events";
import { RedisBase } from "./RedisBase";

export class InitiativeRedis extends RedisBase {
    initiative: string
    constructor(sonic: SonicEmitter){
        super(sonic)
        this.initiative = "initiative"
    }
    getInitiative(){
        
    }
}