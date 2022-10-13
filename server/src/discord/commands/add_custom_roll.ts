import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import winston from "winston";
import { CommandCollection } from "../keeper.js";
import { playerSelectmenu } from "../functions/SelectMenu.js";
import { RollRedis } from "../../data/redis/RollRedis.js";

export default {
  data: new SlashCommandBuilder()
    .setName("add_custom_roll")
    .setDescription("Add a custom roll for your character.")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("roll_notation")
        .setDescription(
          "Enter the roll notation. Comments are allowed: EX: d20+5 attack roll"
        )
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("roll_name")
        .setDescription("Enter a unique name for this roll.")
        .setRequired(true)
    ),
  description: `Add a custom roll for your character for this session.`,
  async execute(
    interaction: ChatInputCommandInteraction,
    sonic: SonicEmitter,
    logger: winston.Logger,
    commands: CommandCollection
  ) {
    if (interaction.channel == null) return;
    const rollNotation = interaction.options.getString("roll_notation", true);
    const rollName = interaction.options.getString("roll_name", true);
    const sessionId = interaction.channel.id;
    const keyId = `${sonic.createUUID()}:${sessionId}`;

    sonic.emit("getRollRedis", (handler: RollRedis) => {
      handler.cacheRoll(keyId, { notation: rollNotation, name: rollName });
    });

    const selectMenu = await playerSelectmenu(sessionId, keyId);

    await interaction.reply({ content: "", components: [selectMenu] });
  },
};
