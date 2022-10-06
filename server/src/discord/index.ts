import { Client, GatewayIntentBits, Collection, Partials, SlashCommandBuilder, MessageInteraction, ChatInputCommandInteraction } from "discord.js";
import { loggingUtilWrapper, logger } from "../utilities/Logging";
import * as path from "node:path";
import * as fs from "node:fs";
import {register_commands} from "../RegisterCommands";
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;

export declare interface KeeperClient {
  client: Client;
  commands: any;
}

interface CommandModule {
  data: SlashCommandBuilder;
  description: string;
  execute: (interaction: ChatInputCommandInteraction | MessageInteraction, commands?: any) => void;
}

export class KeeperClient {
  client: Client;
  commands: any;
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
      partials: [Partials.Channel],
    });
    this.commands = new Collection();
  }
  init(){
    this.client.login(token);
    this.initCommands();
    this.initEvents();
  }
  channelSend(
    item: { embeds?: [item: any]; content?: string; ephemeral?: boolean },
    sessionId: string
  ) {
    this.client.channels.fetch(sessionId).then((channel: any) => {
      channel.send(item);
    });
  }
  initCommands(): void {
    const commandsPath = path.join(__dirname, "../", "commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file: any) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      this.commands.set(command.data.name, command);
    }
    register_commands();
  }
  initEvents(): void {
    const eventsPath = path.join(__dirname, "../", "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file: any) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this.client.once(event.name, async (...args: any) => {
          logger._debug("Discord event executing once",event.name);
          event.execute(...args,logger, this.commands);
        });
      } else {
        this.client.on(event.name, async (...args: any) => {
          logger._debug("Discord event executing",event.name);
          event.execute(...args, logger,this.commands);
        });
      }
    }
  }
}

const parts = new KeeperClient();

export const keeper = loggingUtilWrapper(parts);

keeper.init();
