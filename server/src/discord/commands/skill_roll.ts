import { SlashCommandBuilder } from "discord.js";
import {ChatInputCommandInteraction, Collection} from "discord.js";
import winston from "winston"
import type {SonicEmitter} from "../../local-events/sonic.js"
import {CommandCollection} from "../keeper.js";

export default {
  data: new SlashCommandBuilder()
    .setName("skill_roll")
    .setDescription("Description Here"),
  description: "Describe in more detail",
  async execute(interaction: ChatInputCommandInteraction,sonic: SonicEmitter,logger: winston.Logger, commands:CommandCollection ) {
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