import type { KeeperClient } from "../discord";

export interface IntraServerEvents {
    'error': (callback: (error:unknown) => void) => void;
    'getDice': (callback: (data: any) => Promise<void>) => void;
    'getInit': (callback: (data: any) => Promise<void>) => void;
    'getIO': (callback: (data: any) => Promise<void>) => void;
    'getKeeperClient': (callback: (data: KeeperClient) => Promise<void>) => void;
    'getSpell': (callback: (data: any) => Promise<void>) => void;
    'getRedis': (callback: (data: any) => Promise<void>) => void;
  }