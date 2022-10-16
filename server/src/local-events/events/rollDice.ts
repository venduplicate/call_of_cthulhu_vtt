import {
  ChatInputCommandInteraction,
  Message,
  ContextMenuCommandInteraction,
} from "discord.js";
import { RollRedis } from "../../data/redis/RollRedis";
import { isChatInputInteraction, isMessage } from "../../discord/TypeChecking";
import { DiceHandler} from "../../utilities/DiceRoll";
import { isDiceRollArray, isDiceRoll } from "../../utilities/TypeChecking";
import sonic from "../sonic";

export default {
  name: "info",
  once: false,
  async execute(
    interaction:
      | ChatInputCommandInteraction
      | Message
      | ContextMenuCommandInteraction
  ) {
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;

    let content = "";

    if (isMessage(interaction)) {
      content = interaction.content[0];
    }
    if (isChatInputInteraction(interaction)) {
      content = interaction.options.getString("notation", true);
    }
    sonic.emit("getDice", async (diceRoller: DiceHandler) => {
      sonic.emit("info", `separating dice from comment`);
      const { diceRoll, comment } = diceRoller.rollDice(content);
      sonic.emit("debug", comment);
      sonic.emit("info", "rolling dice");
      sonic.emit("getRollRedis", async (client: RollRedis) => {
        if (isDiceRollArray(diceRoll)) {
          for (const roll of diceRoll) {
            client.logRoll(sessionId, {
              id: sonic.createUUID(),
              roll: roll.toString(),
              comment: comment,
            });
          }
        }
        if (isDiceRoll(diceRoll)) {
          client.logRoll(sessionId, {
            id: sonic.createUUID(),
            roll: diceRoll.toString(),
            comment: comment,
          });
        }
      });
      if (comment !== null) {
        await interaction.reply(`You rolled: ${diceRoll} : ${comment}`);
      } else {
        await interaction.reply(`You rolled: ${diceRoll}`);
      }
    });
  },
};
