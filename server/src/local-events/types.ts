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

export interface IntraServerEvents {
  error: (error: unknown) => void;
  getDice: (callback: (data: any) => Promise<void>) => void;
  getPercentile: (callback: (data: any) => Promise<void>) => void;
  getInitiativeHandler: (callback: (data: any) => Promise<void>) => void;
  getIO: (callback: (data: IOServer) => Promise<void>) => void;
  getKeeperClient: (callback: (data: KeeperClient) => Promise<void>) => void;
  getSpell: (callback: (data: any) => Promise<void>) => void;
  getRedis: (callback: (data: RedisClientType) => Promise<void>) => void;
  getInitiativeFirestore: (
    callback: (initiativeFirestore: InitiativeFirestore) => void
  ) => void;
  getCustomRollFirestore: (
    callback: (data: CustomRollFireStore) => void
  ) => Promise<void>;
  getRollRedis: (callback: (data: RollRedis) => void) => Promise<void>;
  alert: (data: unknown) => void;
  info: (data: string) => void;
  warn: (data: string) => void;
  debug: (data: string) => void;
  addCustomRoll: (data: any) => void;
  getCachedRoll: (cachedId: string, sessionId: string) => void;
  getCommands: (callback: (commands: CommandCollection) => void) => void;
  createPlayerSelectMenu: (
    sessionId: string,
    keyId: string,
    callback: (selectMenu: ActionRowBuilder<SelectMenuBuilder>) => void
  ) => void;
  rollDice: (
    interaction:
      | ContextMenuCommandInteraction
      | Message
      | ChatInputCommandInteraction
  ) => void;
  getRollLogs: () => void;
  getUserAccount: (playerId: string) => void;
  getUserFirestore: (callback: (userHandler: UserBase) => void) => void;
  getUserIDFromDiscordID: (callback: (userId: string) => void) => void;
  getUserFromFirestore: (
    playerId: string,
    callback: (user: UserSchema) => void
  ) => void;
  /// Initiative
  getAllnitiativeFromDatabase: (
    callback: (initiativeArray: InitiativeArray) => Promise<void>
  ) => void;
  createInitiativeClassHandler: (
    initiativeArray: InitiativeArray,
    callback: (initiativeHandler: Initiative) => void
  ) => void;
  updateAllInitiativeToDatabase: (
    initiativeDatabaseHandler: InitiativeFirestore,
    initiativeHandler: Initiative,
    sessionId: string
  ) => void;
  createInitiativeEmbed: (initiativeMap: InitiativeMap, callback: (embed: EmbedBuilder) => void) => void;
}
