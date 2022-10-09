import { ModalSubmitInteraction, SelectMenuInteraction } from "discord.js";
import type {CommandCollection} from "../index.js";
import type {SonicEmitter} from "../../local-events/index.js";
import {logger} from "../../utilities/Logging.js"
import winston from "winston"


module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction: ModalSubmitInteraction, logger: winston.Logger, sonic: SonicEmitter) {
      if (!interaction.isModalSubmit()) return;

  }}