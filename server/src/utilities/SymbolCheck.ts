export function checkSymbol(stringValue: string, symbolToCheck: symbol) {
  return Symbol.for(stringValue) == symbolToCheck;
}
