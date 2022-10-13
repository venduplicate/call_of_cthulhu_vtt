import {
  percentileRoller,
  PercentileRoller,
} from "../../utilities/DiceRoll.js";

export default {
  name: "getPercentileRoller",
  once: false,
  async execute(callback: (roll: PercentileRoller) => void) {
    callback(percentileRoller);
  },
};
