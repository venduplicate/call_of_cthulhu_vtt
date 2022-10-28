import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { RollRedis } from "../../data/redis/RollRedis.js";
import type { SonicEmitter } from "../../local-events/sonic.js";

export default {
  data: new SlashCommandBuilder()
    .setName("retrieve_recent_rolls")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(
    sonic: SonicEmitter,
    interaction: CommandInteraction,
  ) {
    console.log("testing")
    await interaction.reply("Test")
  },
};
