import { ChatInputCommandInteraction, SelectMenuInteraction } from "discord.js";
import type { CommandCollection } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import winston from "winston";
import { logger } from "../../utilities/Logging.js";

export default {
  name: "interactionCreate",
  once: false,
  async execute(
    interaction: ChatInputCommandInteraction,
    sonic: SonicEmitter,
    logger: winston.Logger,
    commands: CommandCollection
  ) {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) {
      return;
    }
    try {
      await command.execute(interaction,sonic,logger,commands);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        logger.alert(error)
      }
      await interaction.reply({
        content: "There was an error while executing this command!",
      });
    }
  },
};
