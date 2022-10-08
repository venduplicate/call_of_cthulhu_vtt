import { ModalSubmitInteraction, SelectMenuInteraction } from "discord.js";
import type {CommandCollection} from "../index";
import type {SonicEmitter} from "../../local-events/index";
import {logger} from "../../utilities/Logging"
import winston from "winston"


module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction: ModalSubmitInteraction, logger: winston.Logger, sonic: SonicEmitter) {
      if (!interaction.isModalSubmit()) return;

  }}