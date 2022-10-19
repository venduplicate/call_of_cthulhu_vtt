import type {
  BackStory,
  BaseCharacterInterface,
  InvestigatorInterface,
} from "../types/InvestigatorTypes";
import type { ServerSkills, Skill, Skills } from "../types/Skills";
import { BaseCharacterHandler } from "./BaseHandler";
import { CharacteristicHandler, LuckHandler, PowerHandler, StrengthHandler, ConstitutionHandler, DexterityHandler, EducationHandler, SizeHandler, AppearanceHandler, IntelligenceHandler } from "./CharacteristicHandler";
import emitterBetweenCharacters, {
  InterCharacterEmitter,
} from "./InterCharacterEmitter";
import {
  IntraCharacterEmitter,
} from "./IntraCharacterEmitter";
import { SanityHandler, StatusEffectTracker } from "./StatusEffectHandler";
import { HealthHandler } from "./HealthHandler";
import { CharacterInitiativeHandler } from "./CharacterInitiativeHandler";
import type { InitiativeInterface } from "../types/Initiative";
import { v4 } from "uuid";
import { WeaponHandler, type Weapon, } from "./AttackHandler";
import type { WeaponInterface } from "../types/Weapon";
import { SkillsHandler } from "./SkillHandler";

export class Investigator {
  intraEmitter: IntraCharacterEmitter;
  interEmitter: InterCharacterEmitter;
  baseData: BaseCharacterHandler;
  sanity: SanityHandler;
  skills: SkillsHandler;
  statusEffects: StatusEffectTracker;
  backstory: BackStory;
  posessions: any;
  health: HealthHandler;
  initiative: CharacterInitiativeHandler;
  weapons: WeaponHandler;
  luck: LuckHandler;
  pow: PowerHandler;
  str: StrengthHandler;
  con: ConstitutionHandler;
  dex: DexterityHandler;
  edu: EducationHandler;
  siz: SizeHandler;
  app: AppearanceHandler;
  int: IntelligenceHandler;
  constructor() {
    this.interEmitter = emitterBetweenCharacters;
    this.intraEmitter = new IntraCharacterEmitter();
    this.baseData = new BaseCharacterHandler();
    this.luck = new LuckHandler();
    this.pow = new PowerHandler();
    this.str = new StrengthHandler();
    this.con = new ConstitutionHandler();
    this.dex = new DexterityHandler();
    this.edu = new EducationHandler();
    this.siz = new SizeHandler();
    this.app = new AppearanceHandler();
    this.int = new IntelligenceHandler();
    this.sanity = new SanityHandler();
    this.skills = new SkillsHandler();
    this.statusEffects = new StatusEffectTracker();
    this.backstory = {} as BackStory; //handler????
    this.posessions = ""; // create handler for this
    this.health = new HealthHandler();
    this.initiative = new CharacterInitiativeHandler();
    this.weapons = new WeaponHandler();
  }
  get initiativeObject() {
    const initiativeObject: InitiativeInterface = {
      id: v4(),
      playerId: this.baseData.playerId,
      playerName: this.baseData.playerNameString,
      combatModifier: this.initiative.getHighestCombatModifier(this.skills.skillMap),
      dexModifier: this.dex.reg,
      roundOrder: 0,
      statusEffects: this.statusEffects.effects,
      firearm: this.initiative.getFirearmObject(this.weapons.weaponsMap),
      isCurrentTurn: false,
    };
    return initiativeObject;
  }
}
