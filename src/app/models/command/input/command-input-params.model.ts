import { RandomInputParams } from './random-input-params.model';
import { UnknownCommandInputParams } from './unknown-command-input-params.model';
import { UnknownParameterInputParams } from './unknown-parameter-input-params.model';
import { MissingParameterInputParams } from './missing-parameter-input-params.model';
import { InvalidArgumentInputParams } from './invalid-argument-input-params.model';
import { InvalidParameterInputParams } from './invalid-parameter-input-params.model';
import { UnknownCliInputParams } from './unknown-cli-input-params.model';
import { EducationInputParams } from './education-input-params.model';
import { SkillsInputParams } from './skills-input-params.model';
import { WorkHistoryInputParams } from './work-history-input-params.model';
import { IssueInputParams } from './issue-input-params.model';
import { ContactInputParams } from './contact-input-params.model';
import { HelpInputParams } from './help-input-params.model';

export type CommandInputParams = RandomInputParams
  | UnknownCommandInputParams
  | UnknownParameterInputParams
  | MissingParameterInputParams
  | InvalidParameterInputParams
  | InvalidArgumentInputParams
  | UnknownCliInputParams
  | HelpInputParams
  | EducationInputParams
  | SkillsInputParams
  | WorkHistoryInputParams
  | IssueInputParams
  | ContactInputParams
  | HelpInputParams;
