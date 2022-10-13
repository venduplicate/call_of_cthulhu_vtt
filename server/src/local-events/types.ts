import type { KeeperClient } from "../discord/keeper.js";
import type { IOServer } from "../sockets/types.js";
import type { RedisClientType } from "redis";
import type { RedisRollLogger } from "../utilities/DiceRoll.js";
import SessionCustomRoll from "../data/firestore/SessionCustomRoll";
import { InitiativeFirestore } from "../data/firestore/InitiativeFirestore";

export interface IntraServerEvents {
  error: (callback: (error: unknown) => void) => void;
  getDice: (callback: (data: any) => Promise<void>) => void;
  getPercentile: (callback: (data: any) => Promise<void>) => void;
  getInit: (callback: (data: any) => Promise<void>) => void;
  getIO: (callback: (data: IOServer) => Promise<void>) => void;
  getKeeperClient: (callback: (data: KeeperClient) => Promise<void>) => void;
  getSpell: (callback: (data: any) => Promise<void>) => void;
  getRedis: (callback: (data: RedisClientType) => Promise<void>) => void;
  getRedisRollLogger: (callback: (data: RedisRollLogger) => void) => void;
  getCustomRollFirestore: (callback: (data: SessionCustomRoll) => void) => void;
  getInitiativeFirestore: (
    callback: (initiativeFirestore: InitiativeFirestore) => void
  ) => void;
}
