import { InputParamValidatorFuncResponse } from './input-param-validator-func-response.model';
import { isValidNumberString, isPositiveInteger } from 'src/app/util';
import { CONSTANTS } from 'src/app/models/constants';

export class CommonInputParamValidatorFuncs {
  static required(paramName: string, value: string): InputParamValidatorFuncResponse<string> {
    if (!value || !value.trim()) {
      return { missing: { paramName } };
    } else {
      return { value };
    }
  }

  static positiveInteger(paramName: string, value: string): InputParamValidatorFuncResponse<number> {
    const countParseResult = isValidNumberString(value);
    if (!countParseResult.valid || !isPositiveInteger(countParseResult.value)) {
      return {
        invalid: {
          paramName,
          value,
          reason: CONSTANTS.PARAM_REASONS.NOT_NON_NEGATIVE_INTEGER
        }
      };
    } else {
      return { value: countParseResult.value };
    }
  }
}
