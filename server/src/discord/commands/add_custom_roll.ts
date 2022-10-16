import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  SelectMenuBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import type { SonicEmitter } from "../../local-events/sonic.js";

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
  description: `Add a custom roll for your character if one is connected to this session. Use the "add_to_session" command to add your character.`,
  async execute(sonic: SonicEmitter, interaction: ChatInputCommandInteraction) {
    if (interaction.channel == null) return;
    sonic.emit("info", "grabbing roll options from interaction");
    const rollNotation = interaction.options.getString("roll_notation", true);
    const rollName = interaction.options.getString("roll_name", true);
    const sessionId = interaction.channel.id;
    const keyId = `${sonic.createUUID()}:${sessionId}`;

    sonic.emit("addCustomRoll")

    sonic.emit("getRollRedis", (handler: RollRedis) => {
      sonic.emit("info", "caching roll data in Redis");
      handler.cacheRoll(keyId, { notation: rollNotation, name: rollName });
    });

    sonic.emit(
      "createPlayerSelectMenu",
      sessionId,
      keyId,
      async (selectMenu: ActionRowBuilder<SelectMenuBuilder>) => {
        sonic.emit("debug", "sending player select menu");
        await interaction.reply({ content: "", components: [selectMenu] });
      }
    );
  },
};
