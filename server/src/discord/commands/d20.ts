import {ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction} from "discord.js";
import winston from "winston"
import type {SonicEmitter} from "../../local-events/sonic.js"

export default {
  data: new ContextMenuCommandBuilder()
    .setName("d20").setType(ApplicationCommandType.User),
  description: "Roll a d20",
  async execute(interaction: UserContextMenuCommandInteraction,sonic: SonicEmitter,logger: winston.Logger, ) {
    console.log("testing")
    await interaction.reply("Test")
  },
};

