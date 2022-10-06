const { SlashCommandBuilder } = require("discord.js");
import {ChatInputCommandInteraction} from "discord.js";
import type {ArcaneTome} from "../src/utilities/Logging";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("name")
    .setDescription("Description Here"),
  description: "Describe in more detail",
  async execute(interaction: ChatInputCommandInteraction,logger: ArcaneTome, commands: any) {
    try {
      if (interaction.channel == null) return;
      
    } catch (error) {
      console.log(error);
    } finally {
      await interaction.reply({content: "", embeds: [], components: []});
    }
  },
};

export {};