import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { RollRedis } from "../../data/redis/RollRedis.js";
import sonic from "../../local-events/sonic.js";

export default {
  data: new SlashCommandBuilder()
    .setName("retrieve_recent_rolls")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(
    interaction: CommandInteraction,
  ) {
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;

    sonic.emit("getRollRedis", async (rollHandler: RollRedis) => {
      const rollLogs = await rollHandler.getRollLogs(sessionId);
    });
  },
};
