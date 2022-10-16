import { EmbedBuilder } from "@discordjs/builders";
import type { CustomRoll } from "../../data/schemas/Roll";

export function rollLogMenu(rollLogs: string[]) {
  const embed = new EmbedBuilder().setTitle("Recent Roll Logs");
  for (const record of rollLogs) {
    const log = JSON.parse(record)
    const fieldString = `Roll: ${log.roll.output} \n Comment: ${log.comment}`;

    embed.addFields({ name: log.name, value: fieldString, inline: false });
  }
  return embed;
}
