import { InputParamValidatorFunc } from './input-param-validator-func.model';

export type InputParamsValidator<T> = { [k in keyof T]: InputParamValidatorFunc<any> };
