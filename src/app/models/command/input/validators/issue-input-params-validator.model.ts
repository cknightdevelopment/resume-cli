import { InputParamValidatorFunc } from './input-param-validator-func.model';
import { InputParamsValidator } from './input-params-validator.model';
import { IssueInputParams } from '../issue-input-params.model';

export class IssueInputParamsValidator implements InputParamsValidator<IssueInputParams> {
  title: InputParamValidatorFunc<string> = (paramName: string, value: string) => {
    return { value: value && value.trim() };
  }
}
