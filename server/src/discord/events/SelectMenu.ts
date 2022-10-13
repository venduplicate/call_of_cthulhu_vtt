import { SelectMenuInteraction } from "discord.js";
import type {CommandCollection} from "../keeper.js";
import type {SonicEmitter} from "../../local-events/sonic.js";
import {logger} from "../../utilities/Logging.js"


export default {
    name: "interactionCreate",
    once: false,
    async execute(interaction: SelectMenuInteraction,commands: CommandCollection,sonic: SonicEmitter) {
      if (!interaction.isSelectMenu()) return;

  }}