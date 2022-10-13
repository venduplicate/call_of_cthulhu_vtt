import winston from "winston";
import type { SonicEmitter } from "../local-events/sonic";
import type { CommandCollection } from "./keeper";

export interface EventFileBase {
  name: string;
  once: boolean;
  execute: (
    args: unknown[],
    sonic: SonicEmitter,
    logger: winston.Logger,
    commands: CommandCollection
  ) => Promise<void>;
}
