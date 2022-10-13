import { InvestigatorFirestore } from "../../data/schemas/Investigator";
import {
  MonsterSchema,
  MonsterFirestoreInterface,
} from "../../data/schemas/Monster";
import { MonsterError } from "../../errors/MonsterErrors.js";
import { roller } from "../../utilities/DiceRoll.js";

export class MonsterBase extends MonsterSchema {
  constructor(data: MonsterFirestoreInterface) {
    super(data);
  }
  getUniqueNumbers(amount: number, total: number) {
    const numberArray = [];

    for (let x = 0; x < amount; x++) {
      numberArray.push(Math.floor(Math.random() * total));
    }

    const numberSet = new Set([...numberArray]);

    if (numberSet.size < amount) {
      this.getUniqueNumbers(amount, total);
    }
    return numberSet;
  }
  getUniqueInvestigators(
    positionSet: Set<number>,
    investigators: InvestigatorFirestore[]
  ) {
    const victimArray: InvestigatorFirestore[] = [];

    positionSet.forEach((item: number, value: number) => {
      victimArray.push(investigators[value]);
    });
    return victimArray;
  }
  checkIfAttacksReached() {
    return this.combat?.per_round == this.attacks_complete;
  }
  incrementAttacksComplete() {
    if (this.checkIfAttacksReached())
      throw new MonsterError("Total Attacks Reached");
    this.attacks_complete += 1;
  }
  baseAttack(sessionId: string) {
    try {
      if (this.checkIfAttacksReached())
        throw new MonsterError("Total Attacks Reached");
      const diceRoll = roller.roll(
        sessionId,
        `${this.damage} + ${this.damage_bonus}`
      );
      return diceRoll;
    } catch (error) {
      if (error instanceof MonsterError) {
        return error.message;
      }
    }
  }
  subtractSanitySuccess(playerSanity: number) {
    const diceRoll = roller.privateRoll(this.sanity_loss_success);
    return playerSanity - diceRoll;
  }
  subtractSanityFailure(playerSanity: number) {
    const diceRoll = roller.privateRoll(this.sanity_loss_failure);
    return playerSanity - diceRoll;
  }
  subtractPow(cost: number) {
    this.pow -= cost;
  }
  subtractMagicPoints(cost: number) {
    this.magic_points -= this.magic_points;
  }
  takeDamage(damage: number) {
    this.hp -= damage;
  }
}
