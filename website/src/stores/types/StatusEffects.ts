export interface SanityInterface {
  maxSanity: number;
  currentSanity: number;
  hasTemporaryInsanity: boolean;
  hasIndefiniteInsanity: boolean;
  hasPermanentInsanity: boolean;
  sessionSanityLoss: number;
}