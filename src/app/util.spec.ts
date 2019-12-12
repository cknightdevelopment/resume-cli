import { isValidNumberString, isPositiveInteger, ciEquals, ciIncludes, getRandomArrayIndex } from './util';

describe('util', () => {
  describe('isValidNumberString', () => {
    it('should parse valid number strings', () => {
      expect(isValidNumberString('1')).toEqual({ valid: true, value: 1 });
      expect(isValidNumberString('01')).toEqual({ valid: true, value: 1 });
      expect(isValidNumberString(' 1')).toEqual({ valid: true, value: 1 });
      expect(isValidNumberString('1.')).toEqual({ valid: true, value: 1 });
      expect(isValidNumberString('1.0')).toEqual({ valid: true, value: 1 });
      expect(isValidNumberString('1.1')).toEqual({ valid: true, value: 1.1 });
      expect(isValidNumberString('-1')).toEqual({ valid: true, value: -1 });
      expect(isValidNumberString('0')).toEqual({ valid: true, value: 0 });
      expect(isValidNumberString('-0')).toEqual({ valid: true, value: -0 });
    });

    it('should return invalid number strings as invalid', () => {
      expect(isValidNumberString('1 1')).toEqual({ valid: false, value: undefined });
      expect(isValidNumberString('1. 1')).toEqual({ valid: false, value: undefined });
      expect(isValidNumberString(null)).toEqual({ valid: false, value: undefined });
      expect(isValidNumberString(undefined)).toEqual({ valid: false, value: undefined });
      expect(isValidNumberString({} as any)).toEqual({ valid: false, value: undefined });
      expect(isValidNumberString(Infinity as any)).toEqual({ valid: false, value: undefined });
      expect(isValidNumberString(-Infinity as any)).toEqual({ valid: false, value: undefined });
    });
  });

  describe('isPositiveInteger', () => {
    it('should return true when positive integer', () => {
      expect(isPositiveInteger(1)).toBeTruthy();
      expect(isPositiveInteger(0)).toBeTruthy();
      expect(isPositiveInteger(1.)).toBeTruthy();
      expect(isPositiveInteger(1.0)).toBeTruthy();
    });

    it('should return false when not a positive integer', () => {
      expect(isPositiveInteger(null)).toBeFalsy();
      expect(isPositiveInteger(0, false)).toBeFalsy();
      expect(isPositiveInteger(-1)).toBeFalsy();
      expect(isPositiveInteger(1.1)).toBeFalsy();
      expect(isPositiveInteger({} as any)).toBeFalsy();
    });
  });

  describe('ciEquals', () => {
    it('should return true when equal with case insensitivity', () => {
      expect(ciEquals('ABC', 'abc')).toBeTruthy();
      expect(ciEquals('  ABC  ', '  abc  ')).toBeTruthy();
      expect(ciEquals('123', '123')).toBeTruthy();
      expect(ciEquals('~!@#$%^&*()', '~!@#$%^&*()')).toBeTruthy();
      expect(ciEquals('', '')).toBeTruthy();
      expect(ciEquals('     ', '     ')).toBeTruthy();

      // if parameters are not string, triple equals should be used
      expect(ciEquals(123 as any, 123 as any)).toBeTruthy();
    });

    it('should return false when not equal with case insensitivity', () => {
      expect(ciEquals('ABC', 'CBA')).toBeFalsy();
      expect(ciEquals('ABC', 'ABC  ')).toBeFalsy();

      // if parameters are not string, triple equals should be used
      expect(ciEquals(null, '')).toBeFalsy();
      expect(ciEquals({ a: 123 } as any, { a: 123 } as any)).toBeFalsy();
    });
  });

  describe('ciIncludes', () => {
    it('should return true when includes with case insensitivity', () => {
      expect(ciIncludes(['ABC'], 'abc')).toBeTruthy();
      expect(ciIncludes(['  ABC  '], '  abc  ')).toBeTruthy();
      expect(ciIncludes(['123'], '123')).toBeTruthy();
      expect(ciIncludes(['~!@#$%^&*()'], '~!@#$%^&*()')).toBeTruthy();
      expect(ciIncludes([''], '')).toBeTruthy();
      expect(ciIncludes(['     '], '     ')).toBeTruthy();

      // if not string, triple equals should be used
      expect(ciIncludes([123 as any], 123 as any)).toBeTruthy();
    });

    it('should return false when not includes with case insensitivity', () => {
      expect(ciIncludes(['ABC'], 'CBA')).toBeFalsy();
      expect(ciIncludes(['ABC'], 'ABC  ')).toBeFalsy();
      expect(ciIncludes([], 'abc')).toBeFalsy();
      expect(ciIncludes(null, 'abc')).toBeFalsy();

      // if not string, triple equals should be used
      expect(ciIncludes([null], '')).toBeFalsy();
      expect(ciIncludes([{ a: 123 } as any], { a: 123 } as any)).toBeFalsy();
    });
  });

  describe('getRandomArrayIndex', () => {
    it('should return index in range of array', () => {
      // 100 times should be sufficient to test this
      for (let i = 0; i < 100; i++) {
        const result = getRandomArrayIndex([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(9);
      }
    });

    it('should return 0 when only one item', () => {
      expect(getRandomArrayIndex(['a'])).toEqual(0);
    });

    it('should return null when falsy or no items', () => {
      expect(getRandomArrayIndex([])).toBeNull();
      expect(getRandomArrayIndex(null)).toBeNull();
    });
  });
});
