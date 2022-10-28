import { ChatInputCommandInteraction, SelectMenuInteraction } from "discord.js";
import type { CommandCollection } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";

export default {
  name: "interactionCreate",
  once: false,
  async execute(commands: CommandCollection,sonic: SonicEmitter, interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) return;
      try {
        command.execute(sonic, interaction);
      } catch (error) {
        if (error instanceof Error) {
          sonic.emit("alert", error);
        }
        await interaction.reply({
          content: "There was an error while executing this command!",
        });
      }
  },
};
