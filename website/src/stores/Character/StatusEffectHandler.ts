import EventEmitter from "node:events";
import { InterCharacterEmitter } from "./InterCharacterEmitter";
import { IntraCharacterEmitter } from "./IntraCharacterEmitter";
import type { SanityInterface } from "../types/Characteristics";
import { durationOfEffectStrings, type ExpirationofEffect, type StatusEffectArray, type StatusEffectInterface } from "../types/StatusEffects";
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
  expiration: ExpirationofEffect;
  type: string;
  remove: () => void;
  constructor(data = { name: "", description: "", expiration: { durationAmount: 0, durationType: "", remainingDuration: 0 }, type: "" } as StatusEffectInterface, remove = () => { return }) {
    this.name = data.name;
    this.description = data.description;
    this.expiration = data.expiration;
    this.type = data.type;
    this.remove = remove;
  }
  get remainingExpiration(){
    return this.expiration.remainingDuration
  }

}

// arithmetic
// get attributes
// 
// WIP
export class CustomEffect {
  variableNumber: number;
  variableString: string;
  constructor(){
    // super(data, remove)
    this.variableNumber = 0;
    this.variableString = ""
  }
  private get number(){
    return this.variableNumber;
  }
  private set number(value: number){
    this.variableNumber = value;
  }
  private get string(){
    return this.variableString;
  }
  private set string(value: string){
    this.variableString = value;
  }
  subject(subjectId: string){
    // get subject instance
    return this
  }
  subtract(subtractor: number){
    const newNumber = this.number - subtractor;
    this.number = newNumber;
    return this;
  }
  add(value: number){
    const newNumber = this.number + value;
    this.number = newNumber;
    return this;
  }
  setNumberValue(value: number){
    this.number = value;
    return this;
  }
  setStringValue(value: string) {
    this.string = value;
    return this;
  }
  execute(fn: () => unknown){
    fn();
    return this;
  }
}


// add.dex.player
// subtract.sanity.bob
// you.lose.sanity.each.round



export class StunEffect extends StatusEffect {
  constructor(data: StatusEffectInterface, remove: () => void) {
    super(
      data,
      remove
    );
  }
}

export class BurnEffect extends StatusEffect {
  totalDamage: number;
  constructor(data: StatusEffectInterface, remove: () => void) {
    super(
      data,
      remove
    );
    this.totalDamage = this.minimumDamage;
  }
  get minimumDamage(){
    return 1;
  }
  get damageTotal(){
    return this.totalDamage;
  }
  set updateDamageTotal(value: number){
    this.totalDamage = value;
  }
  incrementDamage(){
    const newDamage = this.totalDamage * 2;
    this.updateDamageTotal = newDamage;
    return this;
  }
  damage() {
    this.incrementDamage();
    // emitter.to(investigatorId).emit("damage",{type: "burn", source: this.playerName, value: this.damageTotal})
  }
  get extinguish() {
    return this.remove();
  }
}

export class StatusEffectTracker extends EventEmitter {
  effectMap: Map<string, StatusEffect>;
  constructor() {
    super();
    this.effectMap = new Map();
  }
  effectsFromArray(data: StatusEffectArray) {
    data.forEach((record) => {
      if (this.isStun(record.type)) {
        this.createRemoveListener(record.name);
        this.addStatusEffect(new StunEffect(record, this.createRemoveEmitter(record.name)))
      }
      if (this.isBurn(record.type)) {
        this.createRemoveListener(record.name)
        this.addStatusEffect(new BurnEffect(record,this.createRemoveEmitter(record.name)))
      }
      else {
        this.createRemoveListener(record.name)
        this.addStatusEffect(new StatusEffect(record,this.createRemoveEmitter(record.name)))
      }
    })
  }
  get effects() {
    return new Map(this.effectMap);
  }
  set effects(mapOfEffects: Map<string, StatusEffect>) {
    this.effectMap = mapOfEffects;
  }
  isStun(value: string) {
    return value.toLowerCase() == "stun"
  }
  isBurn(value: string) {
    return value.toLowerCase() == "burn"
  }
  apply<T extends StatusEffect>(effect: T) {
    this.addStatusEffect(effect);
    return this;
  }
  createRemoveEmitter(nameOfStatusEffect: string) {
    return () => { this.emit(nameOfStatusEffect) }
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
  constructor(data = { maxSanity: 0, currentSanity: 0, hasIndefiniteInsanity: false, hasTemporaryInsanity: false, hasPermanentInsanity: false, sessionSanityLoss: 0 }) {
    this.maxSanity = data.maxSanity;
    this.currentSanity = data.currentSanity;
    this.hasIndefiniteInsanity = data.hasIndefiniteInsanity;
    this.hasTemporaryInsanity = data.hasTemporaryInsanity
    this.hasPermanentInsanity = data.hasPermanentInsanity
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
