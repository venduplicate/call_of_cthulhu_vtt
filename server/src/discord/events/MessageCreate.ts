import { Message } from "discord.js";
import type { KeeperClient } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import winston from "winston";

const diceRegex = /^(\/|\/[a-z]|\/[A-Z]|r)*\s*(\d)*\s*([d|D])([\d])+/;
const mathRegex = /^([-+]?[0-9]*\.?[0-9]+[\\/\\+\-\\*])+([-+]?[0-9]*\.?[0-9]+)/;

export default {
  name: "messageCreate",
  once: false,
  async execute(
    interaction: Message,
    logger: winston.Logger,
    sonic: SonicEmitter
  ) {
    if (interaction.author.bot) return;
    if (
      !interaction.content.match(diceRegex) &&
      !interaction.content.match(mathRegex)
    )
      return;

    sonic.emit("getKeeperClient", async (client: KeeperClient) => {
      const rollcom = client.commands.get("roll");
      const mathcom = client.commands.get("maths");
      try {
        if (interaction.content.match(mathRegex)) {
          if (mathcom) {
            mathcom.execute(interaction, sonic);
          }
        }
        if (interaction.content.match(diceRegex)) {
          if (rollcom) {
            rollcom.execute(interaction, sonic);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.alert(error);
          console.error(error);
          return;
        }
      }
    });
  },
};
