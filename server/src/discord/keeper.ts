/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Message,
} from "discord.js";
import { loggingUtilWrapper, logger } from "../utilities/Logging.js";
import sonic from "../local-events/sonic.js";
import path from "node:path";
import fs from "node:fs";
import { register_commands } from "./RegisterCommands.js";
import * as dotenv from "dotenv";
import { fileURLToPath, pathToFileURL } from "node:url";
dotenv.config({
  path: "c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env",
});

const token = process.env.DISCORD_TOKEN;

export interface CommandModule {
  data: SlashCommandBuilder;
  description: string;
  execute: (
    interaction: ChatInputCommandInteraction | Message,
    commands?: any
  ) => void;
}

export type CommandCollection = Collection<string, CommandModule>;

export class KeeperClient {
  client: Client;
  commands: CommandCollection;
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
  init() {
    try {
      this.client.login(token);
      this.initCommands()
      this.initEvents()
    } catch (error) {
      console.log(error, "discord init real");
    }
  }
  channelSend(
    item: { embeds?: [item: any]; content?: string; ephemeral?: boolean },
    sessionId: string
  ) {
    this.client.channels.fetch(sessionId).then((channel: any) => {
      channel.send(item);
    });
  }
  async initCommands(): Promise<void> {
    console.log(process.cwd());
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url))
      const commandsPath = path.join(__dirname, "commands");
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file: string) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = await import(pathToFileURL(filePath).toString())
        this.commands.set(command.default.data.name, command);
      }
      register_commands();
    } catch (error) {
      console.log(error, "discord init");
    }
  }
  async initEvents(): Promise<void> {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file: string) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file)
      const event = await import(pathToFileURL(filePath).toString())
      if (event.once) {
        this.client.once(event.name, async (...args: any) => {
          logger.debug("Discord event executing once", event.name);
          event.execute(...args, logger, sonic);
        });
      } else {
        this.client.on(event.name, async (...args: any) => {
          logger.debug("Discord event executing", event.name);
          event.execute(...args, logger, sonic);
        });
      }
    }
  }
}

export const keeper = loggingUtilWrapper(new KeeperClient());
