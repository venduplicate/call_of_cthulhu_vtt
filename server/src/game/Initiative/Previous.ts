function decrementValueForPrevious(value: number, defaultValue: number) {
  if (this.isNotNull(value)) {
    const valueIsNegative = negativeNumberCheck(value);
    const newValue = valueIsNegative
      ? defaultValue
      : decrementNumberByOne(value);
    return newValue;
  }
}

function decrementNumberByOne(value: number) {
  return value + 1;
}

function negativeNumberCheck(value: number) {
  return value - 1 < 0;
}

export default {
  name: "Previous",
  once: false,
  execute(
    currentNumber: number,
    nextNumber: number,
    previousNumber: number,
    endOfMapKey: number
  ) {
    const newCurrent = decrementValueForPrevious(currentNumber, endOfMapKey);
    const newNext = decrementValueForPrevious(nextNumber, endOfMapKey);
    const newPrevious = decrementValueForPrevious(previousNumber, endOfMapKey);

    return [newCurrent, newNext, newPrevious];
  },
};
