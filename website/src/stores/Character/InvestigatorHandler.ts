import type {
  BackStory,
  BaseCharacterInterface,
  InvestigatorInterface,
} from "../types/InvestigatorTypes";
import type { Skills } from "../types/Skills";
import { BaseCharacterHandler } from "./BaseHandler";
import { CharacteristicHandler } from "./CharacteristicHandler";
import interCharacterHandler, {
  InterCharacterEmitter,
} from "./InterCharacterEmitter";
import intraCharacterHandler, {
  IntraCharacterEmitter,
} from "./IntraCharacterEmitter";
import { SanityHandler, StatusEffectTracker } from "./StatusEffectHandler";
import { HealthHandler } from "./HealthHandler";
import { CharacterInitiativeHandler } from "./CharacterInitiativeHandler";
import type { InitiativeInterface } from "../types/Initiative";
import { v4 } from "uuid";
import type { Weapon } from "./AttackHandler";
import type { WeaponInterface } from "../types/Weapon";

export class Investigator {
  intraEmitter: IntraCharacterEmitter;
  interEmitter: InterCharacterEmitter;
  baseData: BaseCharacterHandler;
  characteristics: CharacteristicHandler;
  sanity: SanityHandler;
  skills: Skills;
  statusEffects: StatusEffectTracker;
  backstory: BackStory;
  posessions: any;
  health: HealthHandler;
  initiative: CharacterInitiativeHandler;
  weapons: Map<string, WeaponInterface>;
  constructor(data: InvestigatorInterface) {
    this.interEmitter = interCharacterHandler;
    this.intraEmitter = intraCharacterHandler;
    this.baseData = new BaseCharacterHandler(data);
    this.characteristics = new CharacteristicHandler(data.characteristics);
    this.sanity = new SanityHandler(data.sanity);
    this.skills = data.skills;
    this.statusEffects = new StatusEffectTracker();
    this.backstory = data.backstory;
    this.posessions = data.posessions;
    this.health = new HealthHandler(data.health.hpCurrent, data.health.hpMax);
    this.initiative = new CharacterInitiativeHandler();
    // this should be converted into a WeaponHanlder map. 
    this.weapons = data.weapons;
  }
  get initiativeObject() {
    const initiativeObject: InitiativeInterface = {
      id: v4(),
      playerId: this.baseData.getId(),
      playerName: this.baseData.getName(),
      combatModifier: this.initiative.getHighestCombatModifier(this.skills),
      dexModifier: this.characteristics.dexHandler.reg,
      roundOrder: 0,
      statusEffects: this.statusEffects.effects,
      // will need to update this once weapon map above is updated
      firearm: this.initiative.getFirearmObject(this.weapons),
      isCurrentTurn: false,
    };
    return initiativeObject;
  }
}
