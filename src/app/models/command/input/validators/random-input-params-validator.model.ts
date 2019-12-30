import { InputParamValidatorFunc } from './input-param-validator-func.model';
import { CommonInputParamValidatorFuncs } from './common-input-param-validator-funcs.model';
import { InputParamsValidator } from './input-params-validator.model';
import { RandomInputParams } from '../random-input-params.model';

export class RandomInputParamsValidator implements InputParamsValidator<RandomInputParams> {
  count: InputParamValidatorFunc<number> = (paramName: string, value: string) => {
    return value ? CommonInputParamValidatorFuncs.positiveInteger(paramName, value) : null;
  }
}
