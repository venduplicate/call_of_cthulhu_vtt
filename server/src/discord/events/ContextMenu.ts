import { ContextMenuCommandInteraction, SelectMenuInteraction, UserContextMenuCommandInteraction } from "discord.js";
import type {CommandCollection} from "../index";
import type {SonicEmitter} from "../../local-events/index";
import {logger} from "../../utilities/Logging"


module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction: UserContextMenuCommandInteraction,commands: CommandCollection,sonic: SonicEmitter) {
      if (!interaction.isUserContextMenuCommand()) return;

  }}