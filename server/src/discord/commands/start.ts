import {
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic.js";

export default {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(sonic: SonicEmitter, interaction: CommandInteraction) {
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;
    console.log("testing")
    await interaction.reply("Test")
  },
};
