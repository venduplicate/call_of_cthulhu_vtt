import {
  InitiativeArray,
  InitiativeInterface,
  InitiativeMap,
} from "../../data/schemas/Initiative";

class BaseInitiative {

}

class Initiative {
  initiativeMap: InitiativeMap;
  initiativeArray: InitiativeArray;
  nextNumber: number | null;
  currentNumber: number | null;
  previousNumber: number | null;
  isSorted: boolean;
  size: number;
  constructor(data: InitiativeArray) {
    this.initiativeMap = new Map();
    this.initiativeArray = [...data];
    this.isSorted = false;
    this.size = data.length;
    this.nextNumber = null;
    this.previousNumber = null;
    this.currentNumber = null;
  }
  private isNotNull(value: number | null): value is number {
    return (value as number) !== null;
  }
  private isNotUndefined(value: number | undefined): value is number {
    return (value as number) !== undefined;
  }
  findInitiativeIndexById(id: string) {
    let index: number | null = null;
    this.initiativeMap.forEach((value: InitiativeInterface, key: number) => {
      if (value.id == id) {
        index = key;
      }
    });
    return index;
  }
  public next() {
    this.setCurrentNumber(this.incrementValueForNext(this.currentNumber, 0));
    this.setPreviousNumber(this.incrementValueForNext(this.previousNumber, 0));
    this.setNextNumber(this.incrementValueForNext(this.nextNumber, 0));
    return this;
  }
  private incrementValueForNext(value: number | null, defaultValue: number) {
    if (this.isNotNull(value)) {
      const valueEqualsMapSize = this.compareMapSizeCheck(value);
      const newValue = valueEqualsMapSize
        ? defaultValue
        : this.incrementNumberByOne(value);
      return newValue;
    }
  }
  private compareMapSizeCheck(value: number) {
    return value == this.size - 1;
  }
  private incrementNumberByOne(value: number) {
    return value + 1;
  }
  public previous() {
    this.setCurrentNumber(
      this.decrementValueForPrevious(this.currentNumber, 0)
    );
    this.setPreviousNumber(
      this.decrementValueForPrevious(this.previousNumber, 0)
    );
    this.setNextNumber(this.decrementValueForPrevious(this.nextNumber, 0));
    return this;
  }
  private decrementValueForPrevious(
    value: number | null,
    defaultValue: number
  ) {
    if (this.isNotNull(value)) {
      const valueIsNegative = this.negativeNumberCheck(value);
      const newValue = valueIsNegative
        ? defaultValue
        : this.decrementNumberByOne(value);
      return newValue;
    }
  }
  private negativeNumberCheck(value: number) {
    return value - 1 < 0;
  }
  private decrementNumberByOne(value: number) {
    return value + 1;
  }
  public startRounds() {
    this.sortInitiative().setCollectionAndRoundOrder().setCurrentTurn(0, true);
    this.setCurrentNumber(0);
    this.setNextNumber(1);
    this.setPreviousNumber(this.size - 1);
    this.setIsSorted(true);
  }
  public sortInitiative() {
    this.initiativeArray.sort(
      (initA: InitiativeInterface, initB: InitiativeInterface) => {
        let comparisonNum = this.compareNumbers(
          initA.dex_modifier,
          initB.dex_modifier
        );
        if (comparisonNum == 0) {
          comparisonNum = this.compareNumbers(
            initA.combat_modifier,
            initB.combat_modifier
          );
        }
        return comparisonNum;
      }
    );
    return this;
  }
  private compareNumbers(modifierOne: number, modifierTwo: number) {
    return modifierTwo - modifierOne;
  }
  private setCollectionAndRoundOrder() {
    this.initiativeArray.forEach(
      (record: InitiativeInterface, index: number) => {
        record.round_order = index;
        this.initiativeMap.set(index, record);
      }
    );
    return this;
  }
  public setCurrentTurn(key: number, currentTurnValue: boolean) {
    const record = this.getRecordFromMapByNumberKey(key);
    if (record == undefined) return;
    const newRecord = { ...record };
    newRecord.isCurrentTurn = currentTurnValue;
    this.setRecordinMap(key, newRecord as InitiativeInterface);
    return this;
  }
  public getRecordFromMapByNumberKey(key: number) {
    return { ...this.initiativeMap.get(key) };
  }
  public setRecordinMap(key: number, record: InitiativeInterface) {
    if (record.id == undefined) return;
    this.initiativeMap.set(key, record);
    return this;
  }
  public getInitiativeRecord(position: number) {
    const record = this.initiativeMap.get(position);
    return { ...record };
  }
  public setCurrentNumber(value: number | undefined) {
    if (this.isNotUndefined(value)) {
      this.currentNumber = value;
    }
  }
  public setNextNumber(value: number | undefined) {
    if (this.isNotUndefined(value)) {
      this.nextNumber = value;
    }
  }
  public setPreviousNumber(value: number | undefined) {
    if (this.isNotUndefined(value)) {
      this.previousNumber = value;
    }
  }
  public setIsSorted(value: boolean) {
    this.isSorted = value;
    return this;
  }
}

export default Initiative;
