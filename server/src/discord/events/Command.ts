import { ChatInputCommandInteraction, SelectMenuInteraction } from "discord.js";
import type { CommandCollection } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";

export default {
  name: "interactionCreate",
  once: false,
  async execute(sonic: SonicEmitter, interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    sonic.emit("getCommands", async (commands: CommandCollection) => {
      const command = commands.get(interaction.commandName);
      if (!command) {
        return;
      }
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
    });
  },
};
