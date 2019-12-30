import { InputParamValidatorFuncResponse } from './input-param-validator-func-response.model';

export type InputParamValidatorFunc<T> = (name: string, value: string) => InputParamValidatorFuncResponse<T>;
