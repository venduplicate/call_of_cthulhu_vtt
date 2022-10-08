import {ApplicationCommandType, ContextMenuCommandBuilder,ContextMenuCommandInteraction, UserContextMenuCommandInteraction} from "discord.js";
import winston from "winston"
import type {SonicEmitter} from "../../local-events/index"
import {CommandCollection} from "../index";

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("d20").setType(ApplicationCommandType.User),
  description: "Choose a dice to roll!",
  async execute(interaction: UserContextMenuCommandInteraction,sonic: SonicEmitter,logger: winston.Logger, commands:CommandCollection ) {
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