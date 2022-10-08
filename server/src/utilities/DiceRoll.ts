import { DiceRoller, DiceRoll, NumberGenerator } from "@dice-roller/rpg-dice-roller";
import { Collection } from "discord.js";
import { loggingUtilWrapper } from "./Logging"
import { redisClient } from "../data/RedisAccess";

// keep track of rolls
// redis?
//

const engines = NumberGenerator.engines;
const generator = NumberGenerator.generator;
const diceRoller = new DiceRoller()

generator.engine = engines.nativeMath;

type SuccessMessages = {
  regular: "regular",
  half: "hard",
  fifth: "extreme",
};

type FailureMessages = {
  fumble: "fumble",
  fail: "fail"
}

export class SkillChallenge {
  failureMessages: FailureMessages;
  successMessages: SuccessMessages;
  constructor(){
    this.successMessages = {
      regular: "regular",
      half: "hard",
      fifth: "extreme",
    }
    this.failureMessages = {
      fumble: "fumble",
      fail: "fail"
    }
  }
  isFailure(rolled: number, regular: number) {
    return rolled > regular;
  }
  isFumble(rolled: number, regular: number) {
    if (rolled >= 96 && rolled <= 100 && regular < 50) {
      return true
    }
    if (rolled == 100 && regular >= 50) {
      return true
    }
    else {
      return false;
    }
  }
  isFifth(rolled: number, fifth: number) {
    return rolled <= fifth;
  }
  isHalf(rolled: number, half: number) {
    return rolled <= half
  }
  isRegular(rolled: number, regular: number) {
    return rolled <= regular
  }
  determineSuccess(rolled: number,
    regular: number,
    half: number,
    fifth: number): string | undefined {
    switch (true) {
      case this.isFifth(rolled, fifth):
        return this.successMessages.fifth;
      case this.isHalf(rolled, half):
        return this.successMessages.half;
      case this.isRegular(rolled, regular):
        return this.successMessages.regular;
      default:
        return this.determineFailure(rolled, regular)
    }
  }
  determineFailure(rolled: number, regular: number): string | undefined {
    switch (true) {
      case this.isFumble(rolled, regular):
        return this.failureMessages.fumble;
      case this.isFailure(rolled, regular):
        return this.failureMessages.fail
      default:
        return undefined
    }
  }

}

export class PercentileRoller {
  logRoll(sessionId: string, investigatorID: string, data: number) {
    redisClient.rPush(this.redisKey(sessionId), JSON.stringify({ investigatorID: investigatorID, roll: data }))
  }
  async getRolls(sessionId: string) {
    const rolls = await redisClient.lRange(this.redisKey(sessionId), 0, -1)
    return rolls
  }
  redisKey(sessionId: string) {
    return `${sessionId}rolls`;
  }
  rollTens() {
    return generator.integer(0, 9) * 10;
  }
  rollOnes() {
    return generator.integer(0, 9);
  }
  determineNumberofDice(notation: string) {
    const roll = diceRoller.roll(notation) as DiceRoll;
    return roll.minTotal;
  }
  separateModifiers(notation: string) {
    const modArray = notation.split("+")

    return modArray
  }
  rollMultiplePercentile(notation: string){
    const numDice = this.determineNumberofDice(notation);

    const diceArray = []

    for (let x = 0; x < numDice; x++){
      diceArray.push(this.rollPercentile())
    }

    return diceArray;

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
  penaltyDice(numDice: number): { min: number, total: number, diceArray: number[] } {
    const diceArray = this.rollMultipleTens(numDice);
    const min = this.filterMin(diceArray);
    const ones = this.rollOnes();

    return { min: min, total: min + ones, diceArray: diceArray };
  }
  bonusDice(numDice: number): { max: number, total: number, diceArray: number[] } {
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


export const roller = loggingUtilWrapper(new PercentileRoller());

export const skillChallenge = loggingUtilWrapper(new SkillChallenge());


