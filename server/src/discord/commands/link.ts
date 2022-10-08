import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { SonicEmitter } from "src/local-events";
import type { CommandCollection} from "src/discord/index";
import winston from "winston";
import * as dotenv from 'dotenv'
dotenv.config({path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(
    interaction: ChatInputCommandInteraction, sonic: SonicEmitter, logger: winston.Logger
  ) {
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;
    const url = `${process.env.HOST_URL}/session/${sessionId}`;
    logger.info("sending URL to discord channel", "link")
    await interaction.reply(
      `Here is the URL for your session: ${url} \nThis URL is specific to this channel. If you need to change the session to a different text channel then please use the /changechannel slash command.`
    );
  },
};

export { };