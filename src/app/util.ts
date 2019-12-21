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
  return (a || []).findIndex((x) => ciEquals(x, b)) >= 0;
}

export function getRandomArrayIndex(array: any[]): any {
  return array && array.length
    ? getRandomInteger(0, array.length - 1)
    : null;
}

/**
 * Update the index of an array item
 * @param array Array to use for reordering
 * @param fromIndex Index the item is currently at
 * @param toIndex Index to the item to
 */
export function updateItemIndex(array: any[], fromIndex: number, toIndex: number): void {
  if (!array || !Array.isArray(array)) {
    return;
  }

  if (fromIndex >= array.length || fromIndex < 0) {
    throw new Error('fromIndex is not a valid index.');
  }

  if (toIndex >= array.length || toIndex < 0) {
    throw new Error('toIndex is not a valid index.');
  }

  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}

/**
 * Determines if the value is a valid Date object
 * @param value Object to test
 */
export function isValidDate(value: Date) {
  return value instanceof Date && !isNaN(value.getTime());
}

function getRandomInteger(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
