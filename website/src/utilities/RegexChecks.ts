export const diceRegex = /^(\/|\/[a-z]|\/[A-Z]|r)*\s*(\d)*\s*([d|D])([\d])+/;
export const mathRegex =
  /^([-+]?[0-9]*\.?[0-9]+[\\/\\+\-\\*])+([-+]?[0-9]*\.?[0-9]+)/;

export const mathOperatorRegex = /([+|\-|/|*])/;

export function isDiceMatch(value: string) {
  return diceRegex.test(value);
}

export function isMathMatch(value: string) {
  return mathRegex.test(value);
}

export function isMathOperatorMatch(value: string) {
  return mathOperatorRegex.test(value);
}
