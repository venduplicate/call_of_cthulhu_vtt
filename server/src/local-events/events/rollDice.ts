import { diceRoller } from "../../utilities/DiceRoll";
import { rollRedisHandler } from "../../data/redis/RollRedis";
import { v4 } from "uuid";


export default {
  name: "rollDiceDiscord",
  once: false,
  async execute(notation: string, sessionId: string, callback: (reply: string) => void) {
    const { diceRoll, comment } = diceRoller.rollSingleNotation(notation);
    rollRedisHandler.logRoll(sessionId, { id: v4(), roll: `${diceRoll}`, comment: comment })
    callback(`Roll Results: ${diceRoll} \n ${comment}`);
  },
};
