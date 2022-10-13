import { ButtonInteraction } from "discord.js";
import type { CommandCollection } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import { logger } from "../../utilities/Logging";

export default {
  name: "alert",
  once: false,
  async execute(
    interaction: ButtonInteraction,
    commands: CommandCollection,
    sonic: SonicEmitter
  ) {
    console.log("test");
  },
};
