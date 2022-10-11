import { InitiativeInterface } from "@/data/schemas/Initiative";
import { InitiativeError } from "@/errors/InitiativeError";

class Initiative {
  initiativeMap: Map<number, InitiativeInterface>;
  initiativeArray: InitiativeInterface[];
  nextNumber: number | null;
  currentNumber: number | null;
  previousNumber: number | null;
  isSorted: boolean;
  size: number;
  constructor(
      {
        data,
        isSorted,
        nextNumber,
        previousNumber,
        currentNumber
      }: { data: InitiativeInterface[], isSorted: boolean, nextNumber?: number, previousNumber?: number, currentNumber?: number }
  ) {
    this.initiativeMap = new Map();
    this.initiativeArray = [...data];
    this.isSorted = isSorted;
    this.size = data.length;
    this.nextNumber = nextNumber ? nextNumber : null;
    this.previousNumber = previousNumber ? previousNumber : null;
    this.currentNumber = currentNumber ? currentNumber : null;
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
  nullCheck(){
    return this.currentNumber != null && this.previousNumber != null && this.nextNumber != null
  }
  compareMapSizeCheck(value: number){
    return value == this.size - 1;
  }
  negativeNumberCheck(value: number){
    return value - 1 < 0;
  }
  public next() {
    if(!this.nullCheck()) throw new InitiativeError(`A value is null: current: ${this.currentNumber}; previous: ${this.previousNumber}; next: ${this.nextNumber}`)
    this.currentNumber = this.compareMapSizeCheck(this.currentNumber as number) ? 0 : (this.currentNumber as number) + 1
    this.previousNumber = this.compareMapSizeCheck(this.previousNumber as number) ? 0 : (this.previousNumber as number) + 1
    this.nextNumber = this.compareMapSizeCheck(this.nextNumber as number) ? 0 : (this.nextNumber as number) + 1;
  }
  public previous() {
    if(!this.nullCheck()) throw new InitiativeError(`A value is null: current: ${this.currentNumber}; previous: ${this.previousNumber}; next: ${this.nextNumber}`)
    this.currentNumber = this.negativeNumberCheck(this.currentNumber as number) ? this.size - 1 : (this.currentNumber as number) - 1
    this.previousNumber = this.negativeNumberCheck(this.previousNumber as number) ? this.size - 1 : (this.previousNumber as number) - 1
    this.nextNumber = this.negativeNumberCheck(this.nextNumber as number) ? this.size - 1 : (this.nextNumber as number) - 1;
  }
  private setCollectionAndRoundOrder() {
    this.initiativeArray.forEach(
      (record: InitiativeInterface, index: number) => {
        record.round_order = index;
        this.initiativeMap.set(index, record);
      }
    );
  }
  sortInitiative() {
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
    this.setCollectionAndRoundOrder();
    (this.initiativeMap.get(0) as InitiativeInterface).isCurrentTurn = true;
    this.currentNumber = 0;
    this.nextNumber = 1;
    this.previousNumber = this.size - 1;
    this.isSorted = true;
  }
  compareNumbers(modifierOne: number, modifierTwo: number) {
    return modifierTwo - modifierOne;
  }
}

export default Initiative
