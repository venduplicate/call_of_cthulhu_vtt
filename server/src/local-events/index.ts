import { EventEmitter } from "node:events";
import { Collection } from "discord.js";
import { IntraServerEvents } from "./types";
import { loggingUtilWrapper } from "../utilities/Logging";
import * as fs from "node:fs";
import * as path from "node:path";

export interface CustomEvent {
  name: string;
  once: boolean;
  execute(...args: any): void;
}

export type EventCollection = Collection<string, CustomEvent>;

export declare interface SonicEmitter {
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
  init() {
    const eventsPath = path.join(__dirname, "files");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file: any) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this.once(event.name, (...args: any) => event.execute(...args));
      } else {
        this.on(event.name, (...args: any) => event.execute(...args));
      }
    }
  }
}


const parts = new SonicEmitter();

const sonic = loggingUtilWrapper(parts);

export default sonic;
