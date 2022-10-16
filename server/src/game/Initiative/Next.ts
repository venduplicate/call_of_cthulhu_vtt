const beginningInitiativeKey = 0;

function incrementValueForNext(value: number, defaultValue: number) {
  const valueEqualsMapSize = compareMapSizeCheck(value);
  const newValue = valueEqualsMapSize
    ? defaultValue
    : incrementNumberByOne(value);
  return newValue;
}

function compareMapSizeCheck(value: number) {
  return value == this.size - 1;
}

function incrementNumberByOne(value: number) {
  return value + 1;
}

export default {
  name: "Next",
  once: false,
  execute(currentNumber: number, nextNumber: number, previousNumber: number) {
    const newCurrent = incrementValueForNext(
      currentNumber,
      beginningInitiativeKey
    );
    const newNext = incrementValueForNext(nextNumber, beginningInitiativeKey);
    const newPrevious = incrementValueForNext(
      previousNumber,
      beginningInitiativeKey
    );

    return [newCurrent, newNext, newPrevious];
  },
};
