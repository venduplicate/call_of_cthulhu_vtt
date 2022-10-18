export function compareNumbersAscending(a: number, b: number) {
  return a - b;
}

export function compareNumbersDescending(a: number, b: number) {
  return b - a;
}

export function compareMapSizeCheck(value: number, mapSize: number) {
  return value == mapSize - 1;
}

export function negativeNumberCheck(value: number) {
  return value - 1 < 0;
}
