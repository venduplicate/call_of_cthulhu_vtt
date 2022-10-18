import { DiceRoll } from "@dice-roller/rpg-dice-roller";

export function isString(value: unknown): value is string {
  return typeof value == "string";
}

export function isNumeric(value: unknown): value is number {
  return typeof value == "number";
}

export function isDiceRoll(value: DiceRoll | DiceRoll[]): value is DiceRoll {
  return (value as DiceRoll).total !== null;
}

export function isDiceRollArray(
  value: DiceRoll | DiceRoll[]
): value is DiceRoll[] {
  return (value as DiceRoll[]).filter !== null;
}

export function numberIsNotNull(value: number | null): value is number {
  return (value as number) !== null;
}
export function numberIsNotUndefined(
  value: number | undefined
): value is number {
  return (value as number) !== undefined;
}
