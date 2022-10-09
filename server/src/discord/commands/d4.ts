import {ApplicationCommandType, ContextMenuCommandBuilder,ContextMenuCommandInteraction, UserContextMenuCommandInteraction} from "discord.js";
import winston from "winston"
import type {SonicEmitter} from "../../local-events/index.js"
import {rollDice} from "../functions/RollDice.js"

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("d4").setType(ApplicationCommandType.User),
  description: "Roll a d4",
  async execute(interaction: UserContextMenuCommandInteraction,sonic: SonicEmitter,logger: winston.Logger, ) {
    try {
      rollDice(interaction,sonic,logger)
      
    } catch (error) {
      logger.alert(error)
    }
  },
};

