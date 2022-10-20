import { ButtonInteraction, ChatInputCommandInteraction } from "discord.js";
import type {CommandCollection} from "../keeper.js";
import type {SonicEmitter} from "../../local-events/sonic.js";
import {logger} from "../../utilities/Logging.js"
import winston from "winston";


export default {
    name: "interactionCreate",
    once: false,
    async execute(sonic: SonicEmitter,interaction: ChatInputCommandInteraction) {
      if (!interaction.isButton()) return;

  }}