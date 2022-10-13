import { InvestigatorFirestore } from "../../data/schemas/Investigator.js";
import { MonsterBase } from "./MonsterBase.js";
import { MonsterFirestoreInterface } from "../../data/schemas/Monster.js";
import { roller } from "../../utilities/DiceRoll.js";

export default class Cthulhu extends MonsterBase {
  constructor(data: MonsterFirestoreInterface) {
    super(data);
  }
  scoop(investigators: InvestigatorFirestore[]) {
    const numVictims = roller.privateRoll("d3");
    const numInvestigators = investigators.length;
    const positionSet = this.getUniqueNumbers(numVictims, numInvestigators);
    const victimArray = this.getUniqueInvestigators(positionSet, investigators);
    return victimArray;
  }
  regenerate() {
    this.hp = this.hp + 6;
  }
  rebirth() {
    this.hp = 160;
  }
  reduceHP(damage: number) {
    const hpTemp = this.hp - damage;
    if (hpTemp <= 0) {
      this.rebirth();
      return;
    }
    this.takeDamage(hpTemp);
  }
  tentacles(investigators: InvestigatorFirestore[]) {
    const positionSet = this.getUniqueNumbers(4, investigators.length);
    const victimArray = this.getUniqueInvestigators(positionSet, investigators);
    return victimArray;
  }
}
