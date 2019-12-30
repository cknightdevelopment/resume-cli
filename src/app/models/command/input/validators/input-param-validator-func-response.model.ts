import { InvalidArgumentInputParams } from '../invalid-argument-input-params.model';
import { MissingParameterInputParams } from '../missing-parameter-input-params.model';

export interface InputParamValidatorFuncResponse<T> {
  invalid?: InvalidArgumentInputParams;
  missing?: MissingParameterInputParams;
  value?: T;
}
