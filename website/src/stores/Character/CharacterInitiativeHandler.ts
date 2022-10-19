import type { Skills, Skill } from "../types/Skills";
import type {
  InitiativeArray,
  InitiativeInterface,
  InitiativeMap,
  StatusEffectMap,
  InitiativeOrderFunction,
  FirearmCombatStats,
} from "../types/Initiative";
import type { WeaponInterface, WeaponMap } from "../types/Weapon";
import {
  compareNumbersDescending,
  compareMapSizeCheck,
  negativeNumberCheck,
} from "../../utilities/NumberUtils";
import { v4 } from "uuid";
import type { Weapon } from "./AttackHandler";

const combatStats = ["Firearms", "Fighting", "Dodge"];

export class CharacterInitiativeHandler {
  getHighestCombatModifier(skills: Skills) {
    const combatSkills = this.getCombatSkills(skills);
    combatSkills.sort((skillOne: Skill, skillTwo: Skill) =>
      compareNumbersDescending(skillOne.reg, skillTwo.reg)
    );
    return combatSkills[0].reg;
  }
  private getCombatSkills(skills: Skills) {
    const combatSkills = [] as Array<Skill>;
    skills.forEach((skill: Skill) => {
      const index = combatStats
        .map((value: string) => value)
        .indexOf(skill.name);
      if (index > -1) {
        combatSkills.push(skill);
      } else {
        return;
      }
    });
    return combatSkills;
  }
  getFirearmObject(weapons: WeaponMap): FirearmCombatStats {
    let hasFirearm = false;
    weapons.forEach((item: Weapon) => {
      if (item.skill.name.toLowerCase() == "firearm") {
        hasFirearm = true;
      }
    });
    // send entire weapon???? or?????
    return { hasFirearm: hasFirearm, needsReload: false };
  }
}

export class InitiativeRecordHandler {
  private initiative: InitiativeInterface;
  nextFunction: InitiativeOrderFunction;
  previousFunction: InitiativeOrderFunction;
  constructor(
    data = {combatModifier: 0, roundOrder: 0, playerId: "", id: "", playerName: "", statusEffects: new Map(), dexModifier: 0, firearm: {hasFirearm: false, needsReload: false}, isCurrentTurn: false},
    nextFunction: InitiativeOrderFunction,
    previousFunction: InitiativeOrderFunction
  ) {
    this.initiative = data;
    this.nextFunction = nextFunction;
    this.previousFunction = previousFunction;
  }
  get roundOrder() {
    return this.initiative.roundOrder;
  }
  set roundOrder(value: number) {
    this.initiative.roundOrder = value;
  }
  get dexModifier() {
    return this.initiative.dexModifier;
  }
  get id() {
    return this.initiative.id;
  }
  get combatModifier() {
    return this.initiative.combatModifier;
  }
  get isCurrentTurn() {
    return this.initiative.isCurrentTurn;
  }
  set isCurrentTurn(value: boolean) {
    this.initiative.isCurrentTurn = value;
  }
  get statusEffects() {
    return this.initiative.statusEffects;
  }
  next() {
    this.isCurrentTurn = false;
    this.nextFunction(this.roundOrder);
  }
  previous() {
    this.isCurrentTurn = false;
    this.previousFunction(this.roundOrder);
  }
}

export class InitiativeHandler {
  initiativeMap: InitiativeMap;
  initiativeArray: InitiativeArray;
  currentTurnPosition: number;
  sorted: boolean;
  constructor() {
    this.initiativeMap = new Map();
    this.initiativeArray = new Array();
    this.currentTurnPosition = 0;
    this.sorted = false;
  }
  set isSorted(value: boolean) {
    this.sorted = value;
  }
  get isSorted() {
    return this.sorted;
  }
  get initMapCopy() {
    return new Map(this.initiativeMap);
  }
  get initMap() {
    return this.initiativeMap;
  }
  set initMap(data: InitiativeMap) {
    this.initiativeMap = data;
  }
  addToInitiative(data: InitiativeInterface) {
    const newRecords = [data, ...this.recordArray];
    this.recordArray = newRecords;
    return this;
  }
  get mapToArray() {
    return [...this.initMap.entries()];
  }
  startRounds() {
    this.sort().arrayToMap(this.recordArray);
    this.isSorted = true;
    this.currentTurn = 0;
    return this;
  }
  sort() {
    this.recordArrayCopy.sort(
      (initA: InitiativeInterface, initB: InitiativeInterface) => {
        let comparisonNum = compareNumbersDescending(
          initA.dexModifier,
          initB.dexModifier
        );
        if (comparisonNum == 0) {
          comparisonNum = compareNumbersDescending(
            initA.combatModifier,
            initB.combatModifier
          );
        }
        return comparisonNum;
      }
    );
    return this;
  }
  arrayToMap(initiativeArray: InitiativeArray) {
    const newMap = new Map();
    initiativeArray.forEach((item: InitiativeInterface) => {
      newMap.set(item.roundOrder, this.createInitiative(item));
    });
    this.initMap = newMap;
    return this;
  }
  createInitiative(data: InitiativeInterface) {
    return new InitiativeRecordHandler(data, this.next, this.previous);
  }
  get recordArray() {
    return this.initiativeArray;
  }
  get recordArrayCopy() {
    return [...this.recordArray];
  }
  set recordArray(data: InitiativeArray) {
    this.initiativeArray = data;
  }
  next(roundOrder: number) {
    const isOutofBounds = compareMapSizeCheck(roundOrder, this.mapSize);
    const currentTurnPosition = isOutofBounds ? 0 : roundOrder + 1;
    this.currentTurn = currentTurnPosition;
    this.updateCurrentPositionForRecord = currentTurnPosition;
    return this;
  }
  previous(roundOrder: number) {
    const isNegative = negativeNumberCheck(roundOrder);
    const currentTurnPosition = isNegative ? this.mapSize - 1 : roundOrder - 1;
    this.currentTurn = currentTurnPosition;
    this.updateCurrentPositionForRecord = currentTurnPosition;
    return this;
  }
  get mapSize() {
    return this.initiativeMap.size;
  }
  get currentTurn() {
    return this.currentTurnPosition;
  }
  set currentTurn(value: number) {
    this.currentTurn = value;
  }
  set updateCurrentPositionForRecord(key: number) {
    const newMap = this.initMapCopy;
    const record = newMap.get(key);
    if (record) {
      record.isCurrentTurn = true;
      newMap.set(key, record);
      this.initMap = newMap;
    }
  }
}
