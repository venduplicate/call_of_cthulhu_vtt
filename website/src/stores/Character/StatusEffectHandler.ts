import EventEmitter from "node:events";
import { InterCharacterEmitter } from "./InterCharacterEmitter";
import { IntraCharacterEmitter } from "./IntraCharacterEmitter";
import type { SanityInterface } from "../types/Characteristics";
// stun
// burn
// temporary insanity
// indefinte sanity
// permanent sanity

// use a stun gun
// and then you
// roll to attack
// successful
// dealdamage.stun()?
// or
// it happens when you deal damage.
// so on success, you should dealDamage, which returns damage and a potential effect.

// class StatusEffectEmitter extends EventEmitter {};

// const statusemitter = new StatusEffectEmitter();

const oneFifth = 1 / 5;

export class StatusEffect {
  name: string;
  description: string;
  remove: () => void;
  constructor(name: string, description: string, remove: () => void) {
    this.name = name;
    this.description = description;
    this.remove = remove;
  }
  applyStatusEffect(tracker: StatusEffectTracker) {
    tracker.apply(this);
    return this;
  }
}

export class StunEffect extends StatusEffect {
  constructor(roundsToExpire: "1d6" | string, remove: () => void) {
    super(
      "stun",
      `Your character can not act for ${roundsToExpire} rounds`,
      remove
    );
  }
}

export class BurnEffect extends StatusEffect {
  totalRounds: number;
  constructor(remove: () => void) {
    super(
      "burn",
      "Your character is on fire until the fire is put out.",
      remove
    );
    this.totalRounds = 0;
  }
  getTotalRounds() {
    return this.totalRounds;
  }
  setTotalRounds(value: number) {
    this.totalRounds = value;
  }
  incrementRounds() {
    const newRounds = this.getTotalRounds() + 1;
    this.setTotalRounds(newRounds);
    return this;
  }
  extinguish() {
    return this.remove;
  }
}

export class StatusEffectTracker extends EventEmitter {
  effectMap: Map<string, StatusEffect>;
  constructor() {
    super();
    this.effectMap = new Map();
  }
  get effects() {
    return this.effectMap;
  }
  set effects(mapOfEffects: Map<string, StatusEffect>) {
    this.effectMap = mapOfEffects;
  }
  apply<T extends StatusEffect>(effect: T) {
    this.addStatusEffect(effect);
    return this;
  }
  createRemoveEmitter(nameOfStatusEffect: string) {
    return this.emit(nameOfStatusEffect);
  }
  createRemoveListener(nameOfStatusEffect: string) {
    this.once(nameOfStatusEffect, () => {
      this.removeStatusEffect(nameOfStatusEffect);
    });
    return this;
  }
  addStatusEffect<T extends StatusEffect>(effect: T) {
    const newEffectArray = this.effects.set(effect.name, effect);
    this.effects = newEffectArray;
    return this;
  }
  removeStatusEffect(effectName: string) {
    const newEffectMap = { ...this.effects };
    const effectPosition = newEffectMap.get(effectName);
    if (effectPosition == undefined) return this;
    newEffectMap.delete(effectName);
    this.effects = newEffectMap;
    return this;
  }
}

// sanity points
// type of sanity
// sanity phases

export class SanityHandler {
  private maxSanity: number;
  private currentSanity: number;
  private hasTemporaryInsanity: boolean;
  private hasIndefiniteInsanity: boolean;
  private hasPermanentInsanity: boolean;
  private sessionSanityLoss: number;
  private static temporarySanityAmount = 5;
  private static oneFifth = 1 / 5;
  constructor(data: SanityInterface) {
    this.maxSanity = data.maxSanity;
    this.currentSanity = data.currentSanity;
    this.hasIndefiniteInsanity = data.hasIndefiniteInsanity || false;
    this.hasTemporaryInsanity = data.hasTemporaryInsanity || false;
    this.hasPermanentInsanity = data.hasPermanentInsanity || false;
    this.sessionSanityLoss = data.sessionSanityLoss;
  }
  public get sanityAtCurrent() {
    return this.currentSanity;
  }
  public set sanityAtCurrent(value: number) {
    if (value < 0) {
      this.currentSanity = 0;
    } else {
      this.currentSanity = value;
    }
  }
  public get sanityMax() {
    return this.maxSanity;
  }
  public set sanityMax(value: number) {
    this.maxSanity = value;
  }
  public loseSanity(sanityLoss: number) {
    const sessionSanityLoss = this.sanityLossFortheSession + sanityLoss;
    const currentSanityLoss = this.subtractCurrentSanity(sanityLoss);
    this.sanityLossFortheSession = sessionSanityLoss;
    switch (true) {
      case this.checkTemporaryInsanity(sanityLoss):
        if (this.isTemporarilyInsane) {
          break;
        }
        this.isTemporarilyInsane = true;
        break;
      case this.checkIndefiniteInsanity():
        if (this.isIndefinitelyInsane) {
          break;
        }
        this.isIndefinitelyInsane = true;
        break;
      case currentSanityLoss <= 0:
        this.isPermanentlyInsane = true;
        break;
      default:
        break;
    }
    this.sanityAtCurrent = currentSanityLoss;
    return this;
  }
  public get sanityLossFortheSession() {
    return this.sessionSanityLoss;
  }
  public set sanityLossFortheSession(value: number) {
    this.sessionSanityLoss = value;
  }
  private subtractCurrentSanity(value: number) {
    const newSanity = this.sanityAtCurrent - value;
    return newSanity;
  }
  private checkTemporaryInsanity(sanityLoss: number) {
    return sanityLoss >= this.temporarySanityAmount;
  }
  public get temporarySanityAmount() {
    return SanityHandler.temporarySanityAmount;
  }
  public get isTemporarilyInsane() {
    return this.hasTemporaryInsanity;
  }
  public set isTemporarilyInsane(value: boolean) {
    this.hasIndefiniteInsanity = value;
  }
  private checkIndefiniteInsanity() {
    const oneFifthofCurrentSanity = this.sanityAtCurrent * this.oneFith;
    return this.sanityLossFortheSession >= oneFifthofCurrentSanity;
  }
  private get oneFith() {
    return SanityHandler.oneFifth;
  }
  public get isIndefinitelyInsane() {
    return this.hasIndefiniteInsanity;
  }
  public set isIndefinitelyInsane(value: boolean) {
    this.hasIndefiniteInsanity = value;
  }
  public get isPermanentlyInsane() {
    return this.hasPermanentInsanity;
  }
  public set isPermanentlyInsane(value: boolean) {
    this.hasPermanentInsanity = value;
  }
  public resetSessionSanityLoss() {
    this.sanityLossFortheSession = 0;
    return this;
  }
  public subtractMaxSanity(value: number) {
    const newMaxSanity = this.sanityMax - value;
    this.sanityMax = newMaxSanity;
    return this;
  }
}
