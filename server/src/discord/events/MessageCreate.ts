import { Message } from "discord.js";
import type { CommandCollection, KeeperClient } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import winston from "winston";

export const diceRegex = /^(\/|\/[a-z]|\/[A-Z]|r)*\s*(\d)*\s*([d|D])([\d])+/;
export const mathRegex =
  /^([-+]?[0-9]*\.?[0-9]+[\\/\\+\-\\*])+([-+]?[0-9]*\.?[0-9]+)/;

export default {
  name: "messageCreate",
  once: false,
  async execute(
    sonic: SonicEmitter,
    interaction: Message,
  ) {
    if (interaction.author.bot) return;
    if (
      !interaction.content.match(diceRegex) &&
      !interaction.content.match(mathRegex)
    )
      return;

    const notation = interaction.content[0];

    const sessionId = interaction.channelId;
    
    if (interaction.content.match(mathRegex)) {
      console.log("test")
    }
    if (interaction.content.match(diceRegex)) {
      sonic.emit("rollDiceDiscord", notation, sessionId, async (replyString: string) => {
        sonic.emit("info", replyString);
        await interaction.reply(replyString);
      })
    }
  },
};
