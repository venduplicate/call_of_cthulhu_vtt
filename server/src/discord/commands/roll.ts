import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic";

export default {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a dice")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("notation")
        .setDescription(
          "Enter the roll notation. Comments are allowed: EX: d20+5 attack roll"
        )
        .setRequired(true)
    ),
  description: `Roll dice. If you need to roll bonus dice, penalty dice, or percentile dice, use their appropriate commands for ease of use. Use the /help command to get a list of commands.`,
  async execute(sonic: SonicEmitter, interaction: ChatInputCommandInteraction) {
    const sessionId = interaction.channelId;
    const notation = interaction.options.getString("roll", true)
    sonic.emit("rollDiceDiscord", notation,sessionId, async (replyString: string) => {
      sonic.emit("info",replyString);
      await interaction.reply(`replyString`);
    })
  },
};
