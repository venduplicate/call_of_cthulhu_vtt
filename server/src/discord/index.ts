import { Client, GatewayIntentBits, Collection, Partials, SlashCommandBuilder, MessageInteraction, ChatInputCommandInteraction, Message } from "discord.js";
import { loggingUtilWrapper, logger } from "../utilities/Logging.js";
import sonic from "../local-events/index.js";
import * as path from "node:path";
import * as fs from "node:fs";
import {register_commands} from "../RegisterCommands.js";
import * as dotenv from 'dotenv'
dotenv.config({path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})


const token = process.env.DISCORD_TOKEN;


export interface CommandModule {
  data: SlashCommandBuilder;
  description: string;
  execute: (interaction: ChatInputCommandInteraction | Message , commands?: any) => void;
}

export type CommandCollection = Collection<string,CommandModule>

export class KeeperClient {
  client: Client;
  commands:CommandCollection;
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
          logger.debug("Discord event executing once",event.name);
          event.execute(...args,logger,sonic);
        });
      } else {
        this.client.on(event.name, async (...args: any) => {
          logger.debug("Discord event executing",event.name);
          event.execute(...args,logger,sonic);
        });
      }
    }
  }
}

export const keeper = loggingUtilWrapper(new KeeperClient());
