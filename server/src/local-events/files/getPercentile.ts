import {roller, PercentileRoller} from "../../utilities/DiceRoll";

module.exports = {
  name: "getPercentileRoller",
  once: false,
  async execute(callback: (roll: PercentileRoller) => void) {
    callback(roller)
  },
};