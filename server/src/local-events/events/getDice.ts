import type { DiceRoller } from "@dice-roller/rpg-dice-roller";
import {diceRoller} from "../../utilities/DiceRoll";

module.exports = {
  name: "getDice",
  once: false,
  async execute(callback: (roll: DiceRoller) => void) {
    callback(diceRoller)
  },
};