import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import winston from "winston";

export default {
  data: new SlashCommandBuilder()
    .setName("add_custom_roll")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(
    interaction: CommandInteraction,
    sonic: SonicEmitter,
    logger: winston.Logger
  ) {
    console.log("test");
    await interaction.reply("Hello")
  },
};