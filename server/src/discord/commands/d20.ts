import {ApplicationCommandType, ContextMenuCommandBuilder,ContextMenuCommandInteraction, UserContextMenuCommandInteraction} from "discord.js";
import winston from "winston"
import type {SonicEmitter} from "../../local-events/sonic.js"
import {rollDice} from "../functions/RollDice.js"

export default {
  data: new ContextMenuCommandBuilder()
    .setName("d20").setType(ApplicationCommandType.User),
  description: "Roll a d20",
  async execute(interaction: UserContextMenuCommandInteraction,sonic: SonicEmitter,logger: winston.Logger, ) {
    try {
      rollDice(interaction,sonic,logger)
      
    } catch (error) {
      logger.alert(error)
    }
  },
};

