import {
  ChatInputCommandInteraction,
  Message,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import sonic from "../../local-events/sonic.js";

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
  async execute(interaction: Message | ChatInputCommandInteraction) {
    sonic.emit("rollDice", interaction);
  },
};
