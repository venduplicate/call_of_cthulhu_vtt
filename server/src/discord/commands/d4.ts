
import { type ContextMenuCommandInteraction, ContextMenuCommandBuilder, ApplicationCommandType } from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic.js"

export default {
  data: new ContextMenuCommandBuilder()
    .setName("d4").setType(ApplicationCommandType.User),
  description: "Roll a d4",
  async execute(sonic: SonicEmitter, interaction: ContextMenuCommandInteraction) {
    console.log("testing")
    await interaction.reply("Test")
  },
};

