import { RandomCommandInputParams } from './random-command-input-params.model';
import { UnknownCommandInputParams } from './unknown-command-input-params.model';
import { UnknownParameterInputParams } from './unknown-parameter-input-params.model';
import { MissingParameterInputParams } from './missing-parameter-input-params.model';
import { InvalidArgumentInputParams } from './invalid-argument-input-params.model';
import { InvalidParameterInputParams } from './invalid-parameter-input-params.model';
import { UnknownCliInputParams } from './unknown-cli-input-params.model';
import { HelpCommandInputParams } from './help-command-input-params.model';
import { EducationInputParams } from './education-input-params.model';

export type CommandInputParams = RandomCommandInputParams
  | UnknownCommandInputParams
  | UnknownParameterInputParams
  | MissingParameterInputParams
  | InvalidParameterInputParams
  | InvalidArgumentInputParams
  | UnknownCliInputParams
  | HelpCommandInputParams
  | EducationInputParams;
