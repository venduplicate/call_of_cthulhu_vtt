import type { CommandCollection, KeeperClient } from "../discord/keeper.js";
import type { IOServer } from "../sockets/types.js";
import type { RedisClientType } from "redis";
import type { InitiativeFirestore } from "../data/firestore/Combat/InitiativeFirestore";
import type { CustomRollFireStore } from "../data/firestore/Users/CustomRollFirestore";
import type { RollRedis } from "../data/redis/RollRedis.js";
import type {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  EmbedBuilder,
  Message,
  SelectMenuBuilder,
} from "discord.js";
import type { SonicEmitter } from "./sonic.js";
import { UserBase } from "../data/firestore/Users/UserBase.js";
import { UserSchema } from "../data/schemas/User.js";
import { InitiativeArray, InitiativeMap } from "../data/schemas/Initiative.js";
import Initiative from "../game/Initiative/Initiative.js";
import type { DiceRoll } from "@dice-roller/rpg-dice-roller";
import RollError from "../errors/RollError.js";

export interface IntraServerEvents {
  error: (error: unknown) => void;
  alert: (data: unknown) => void;
  info: (data: string) => void;
  warn: (data: string) => void;
  debug: (data: string) => void;
  rollDiceDiscord: (notation: string, sessionId: string,callback: (reply: string,error: RollError) => void) => void;
}
