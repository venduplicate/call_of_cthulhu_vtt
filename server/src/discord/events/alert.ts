import { ButtonInteraction } from "discord.js";
import type {CommandCollection} from "../index";
import type {SonicEmitter} from "../../local-events/index";
import {logger} from "../../utilities/Logging"


module.exports = {
    name: "alert",
    once: false,
    async execute(interaction: ButtonInteraction,commands: CommandCollection,sonic: SonicEmitter) {
      

  }}