export interface Characteristic {
  reg: number;
  half: number;
  fifth: number;
}

export type CharacteristicStrings =
  | "str"
  | "dex"
  | "con"
  | "siz"
  | "app"
  | "int"
  | "pow"
  | "edu"
  | "luck";

export type CharacteristicList = Record<CharacteristicStrings, Characteristic>;

export interface SanityInterface {
  maxSanity: number;
  currentSanity: number;
  hasTemporaryInsanity: boolean;
  hasIndefiniteInsanity: boolean;
  hasPermanentInsanity: boolean;
  sessionSanityLoss: number;
}
