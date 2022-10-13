/* eslint-disable @typescript-eslint/no-var-requires */
import { EventEmitter } from "node:events";
import { Collection } from "discord.js";
import { IntraServerEvents } from "./types";
import { loggingUtilWrapper, logger } from "../utilities/Logging.js";
import {
  createDirName,
  createPath,
  getFiles,
  getDefaultData,
} from "../utilities/PathCreation.js";
import { v4 } from "uuid";

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
      const eventsPath = createPath(createDirName(import.meta.url), "events");
      const eventFiles = await getFiles(import.meta.url, "events");
      for (const file of eventFiles) {
        const event = await getDefaultData(eventsPath, file);
        if (event == undefined) continue;
        if (event.once) {
          console.log(event);
          this.once(event.name, (...args: unknown[]) => event.execute(...args));
        } else {
          this.on(event.name, (...args: unknown[]) => event.execute(...args));
        }
      }
    } catch (error) {
      console.log(error, "sonic init");
    }
  }
  createUUID() {
    return v4();
  }
}

const sonic = loggingUtilWrapper(new SonicEmitter());

export default sonic;
