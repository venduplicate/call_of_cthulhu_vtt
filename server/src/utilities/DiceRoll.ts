import { NumberGenerator } from "@dice-roller/rpg-dice-roller";
import { Collection } from "discord.js";
import { loggingUtilWrapper } from "./Logging";
import {redisClient} from "../data/RedisAccess";

// keep track of rolls
// redis?
//

const engines = NumberGenerator.engines;
const generator = NumberGenerator.generator;

generator.engine = engines.nativeMath;

export class PercentileRoller {
  logRoll(sessionId: string,investigatorID: string,data: number){
    redisClient.rPush(this.redisKey(sessionId),JSON.stringify({investigatorID: investigatorID,roll: data}))
  }
  async getRolls(sessionId: string){
    const rolls = await redisClient.lRange(this.redisKey(sessionId),0, -1)
    return rolls
  }
  redisKey(sessionId: string){
    return `${sessionId}rolls`;
  }
  rollTens() {
    return generator.integer(0, 9) * 10;
  }
  rollOnes() {
    return generator.integer(0, 9);
  }
  rollPercentile() {
    const tens = this.rollTens();
    const ones = this.rollOnes();

    if (tens == 0 && ones == 0) {
      return 100;
    }
    return tens + ones;
  }
  rollMultipleTens(numDice: number) {
    const diceArray = [];
    for (let x = 0; x++; x < numDice) {
      diceArray.push(this.rollTens());
    }
    return diceArray;
  }
  penaltyDice(numDice: number): {min: number, total: number, diceArray: number[]} {
    const diceArray = this.rollMultipleTens(numDice);
    const min = this.filterMin(diceArray);
    const ones = this.rollOnes();
  
    return { min: min, total: min + ones, diceArray: diceArray };
  }
  bonusDice(numDice: number): {max: number, total: number, diceArray: number[]} {
    const diceArray = this.rollMultipleTens(numDice);
    const max = this.filterMax(diceArray);
    const ones = this.rollOnes();
  
    return { max: max, total: max + ones, diceArray: diceArray };
  }
  filterMin(diceArray: number[]) {
    const min = Math.min(...diceArray);
    return min;
  }
  filterMax(diceArray: number[]) {
    const max = Math.max(...diceArray);
    return max;
  }
}

const parts = new PercentileRoller()

export const roller = loggingUtilWrapper(parts);

