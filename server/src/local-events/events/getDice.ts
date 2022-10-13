import type { DiceRoller } from "@dice-roller/rpg-dice-roller";
import { diceRoller } from "../../utilities/DiceRoll.js";

export default {
  name: "getDice",
  once: false,
  async execute(callback: (roll: DiceRoller) => void) {
    callback(diceRoller);
  },
};
