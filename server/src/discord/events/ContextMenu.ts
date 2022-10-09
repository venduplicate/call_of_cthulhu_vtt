import { ContextMenuCommandInteraction, SelectMenuInteraction, UserContextMenuCommandInteraction } from "discord.js";
import type {CommandCollection} from "../index.js";
import type {SonicEmitter} from "../../local-events/index.js";
import {logger} from "../../utilities/Logging.js"


module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction: UserContextMenuCommandInteraction,commands: CommandCollection,sonic: SonicEmitter) {
      if (!interaction.isUserContextMenuCommand()) return;

  }}