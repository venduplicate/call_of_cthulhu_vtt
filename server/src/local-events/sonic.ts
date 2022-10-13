/* eslint-disable @typescript-eslint/no-var-requires */
import { EventEmitter } from "node:events";
import { Collection } from "discord.js";
import { IntraServerEvents } from "./types";
import { loggingUtilWrapper, logger } from "../utilities/Logging.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export interface CustomEvent {
  name: string;
  once: boolean;
  execute(...args: unknown[]): void;
}

export type EventCollection = Collection<string, CustomEvent>;

export declare interface SonicEmitter extends EventEmitter {
  on<U extends keyof IntraServerEvents>(
    event: U,
    listener: IntraServerEvents[U]
  ): this;

  emit<U extends keyof IntraServerEvents>(
    event: U,
    ...args: Parameters<IntraServerEvents[U]>
  ): boolean;
}

export class SonicEmitter extends EventEmitter {
  events: EventCollection;
  constructor() {
    super();
    this.events = new Collection();
  }
  async init() {
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const eventsPath = path.join(__dirname, "events");
      const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file: string) => file.endsWith(".js"));

      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const data = await import(pathToFileURL(filePath).toString());
        const event = data.default;
        console.log(event)
        if (event.once) {
          this.once(event.name, (...args: unknown[]) => event.execute(...args));
        } else {
          this.on(event.name, (...args: unknown[]) => event.execute(...args));
        }
      }
    } catch (error) {
      console.log(error, "sonic init");
    }
  }
}

const sonic = loggingUtilWrapper(new SonicEmitter());

export default sonic;
