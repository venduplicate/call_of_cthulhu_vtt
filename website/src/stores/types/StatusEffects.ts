import type { SchemaBase } from "./SchemaBase";

export interface SanityInterface {
  maxSanity: number;
  currentSanity: number;
  hasTemporaryInsanity: boolean;
  hasIndefiniteInsanity: boolean;
  hasPermanentInsanity: boolean;
  sessionSanityLoss: number;
}

export type StatusEfffectTypes = "burn" | "stun" | string;

export const durationOfEffectStrings = {
  rounds: "rounds",
  minutes: "minutes",
  hours: "hours",
  weeks: "weeks",
  months: "months",
  years: "years",

}

export type DurationTypes = typeof durationOfEffectStrings | string;

export type ExpirationofEffect = { durationType: DurationTypes, durationAmount: number , remainingDuration: number}

export interface StatusEffectInterface extends SchemaBase {
  name: string;
  description: string;
  type: string;
  expiration: ExpirationofEffect
}

export type StatusEffectArray = Array<StatusEffectInterface>