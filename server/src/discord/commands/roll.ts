import { Message, SlashCommandBuilder } from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import { rollDice } from "../functions/RollDice.js";
import winston from "winston";
import * as dotenv from "dotenv";
dotenv.config({
  path: "c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env",
});

export default {
  data: new SlashCommandBuilder().setName("roll").setDescription("Roll a dice"),
  description: `Roll dice. If you need to roll bonus dice, penalty dice, or percentile dice, use their appropriate commands for ease of use. Use the /help command to get a list of commands.`,
  async execute(
    interaction: Message,
    sonic: SonicEmitter,
    logger: winston.Logger
  ) {
    rollDice(interaction, sonic, logger);
  },
};

export {};
