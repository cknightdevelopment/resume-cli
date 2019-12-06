export function isValidNumberString(value: string): { valid: boolean, value: number } {
  const valueAsNumber = Number(value);
  const valid = !Object.is(valueAsNumber, NaN)
      && !Object.is(valueAsNumber, Infinity)
      && !Object.is(valueAsNumber, -Infinity)
      && !Object.is(value, null)
      && !(/^\s*$/.test(value));

  return { valid, value: valid ? valueAsNumber : undefined };
}

export function isPositiveInteger(value: number, allowZero = true) {
  return Number.isInteger(value) && (allowZero ? value >= 0 : value > 0);
}

export function ciEquals(a: string, b: string): boolean {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
    : a === b;
}

export function ciIncludes(a: string[], b: string): boolean {
  return a.findIndex((x) => ciEquals(x, b)) >= 0;
}
