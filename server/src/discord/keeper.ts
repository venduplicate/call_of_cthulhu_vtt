/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  SlashCommandBuilder,
} from "discord.js";
import { loggingUtilWrapper, logger } from "../utilities/Logging.js";
import sonic, { SonicEmitter } from "../local-events/sonic.js";
import { register_commands } from "./RegisterCommands.js";
import winston from "winston";
import * as dotenv from "dotenv";
import {
  createDirName,
  createPath,
  getFiles,
  getDefaultData,
} from "../utilities/PathCreation.js";
import type { EventFileBase } from "./types";
dotenv.config({
  path: "c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env",
});

const token = process.env.DISCORD_TOKEN;
export interface CommandModule {
  data: SlashCommandBuilder;
  description: string;
  execute: (sonic: SonicEmitter, ...args: unknown[]) => void;
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
      this.initCommands();
      this.initEvents();
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
      const commandsPath = createPath(
        createDirName(import.meta.url),
        "commands"
      );
      const commandFiles = await getFiles(import.meta.url, "commands");
      for (const file of commandFiles) {
        const command: CommandModule = await getDefaultData(commandsPath, file);
        this.commands.set(command.data.name, command);
      }
      register_commands();
    } catch (error) {
      console.log(error, "discord init");
    }
  }
  async initEvents(): Promise<void> {
    const eventsPath = createPath(createDirName(import.meta.url), "events");
    const eventFiles = await getFiles(import.meta.url, "events");

    for (const file of eventFiles) {
      const event: EventFileBase = await getDefaultData(eventsPath, file);
      if (event.once) {
        this.client.once(event.name, async (...args: unknown[]) => {
          logger.debug("Discord event executing once", event.name);
          event.execute(sonic, ...args);
        });
      } else {
        this.client.on(event.name, async (...args: unknown[]) => {
          logger.debug("Discord event executing", event.name);
          event.execute(sonic, ...args);
        });
      }
    }
  }
}

export const keeper = loggingUtilWrapper(new KeeperClient());
