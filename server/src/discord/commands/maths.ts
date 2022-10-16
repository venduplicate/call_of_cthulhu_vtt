import { Message, SlashCommandBuilder } from "discord.js";
import sonic from "../../local-events/sonic.js";
import { evaluate } from "mathjs";

export default {
  data: new SlashCommandBuilder()
    .setName("maths")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(interaction: Message) {
    try {
      const notation = interaction.content;

      const equals = evaluate(notation);

      await interaction.reply(`${equals}`);
    } catch (error) {
      sonic.emit("alert", error);
    }
  },
};
