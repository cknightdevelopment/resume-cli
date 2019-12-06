import { isValidNumberString, isPositiveInteger } from './util';

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
});
