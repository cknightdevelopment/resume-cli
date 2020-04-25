import { Action } from '@ngrx/store';
import { RandomInputParams } from 'src/app/models/command/input/random-input-params.model';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { EducationInputParams } from 'src/app/models/command/input/education-input-params.model';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';
import { InitializedCommand } from './command.reducers';
import { SkillsInputParams } from 'src/app/models/command/input/skills-input-params.model';
import { SkillsExecutedModel } from 'src/app/models/command/executed/skills-executed.model';
import { LinksInputParams } from 'src/app/models/command/input/links-input-params.model';
import { LinksExecutedModel } from 'src/app/models/command/executed/links-executed.model';
import { WorkHistoryInputParams } from 'src/app/models/command/input/work-history-input-params.model';
import { WorkHistoryExecutedModel } from 'src/app/models/command/executed/work-history-executed.model';
import { IssueInputParams } from 'src/app/models/command/input/issue-input-params.model';
import { IssueExecutedModel } from 'src/app/models/command/executed/issue-executed.model';
import { ContactInputParams } from 'src/app/models/command/input/contact-input-params.model';
import { ContactExecutedModel } from 'src/app/models/command/executed/contact-executed.model';
import { HelpInputParams } from 'src/app/models/command/input/help-input-params.model';
import { HelpExecutedModel } from 'src/app/models/command/executed/help-executed.model';

export enum CommandActionTypes {
  CommandEffectsInit = '[Command] Effects Init',
  CommandInitiated = '[Command] Command Initiated',
  CommandExecutedFail = '[Command] Executed Fail',

  RandomExecuted = '[Command] Random Executed',
  RandomExecutedSuccess = '[Command] Random Executed Success',

  EducationExecuted = '[Command] Education Executed',
  EducationExecutedSuccess = '[Command] Education Executed Success',

  SkillsExecuted = '[Command] Skills Executed',
  SkillsExecutedSuccess = '[Command] Skills Executed Success',

  LinksExecuted = '[Command] Links Executed',
  LinksExecutedSuccess = '[Command] Links Executed Success',

  WorkHistoryExecuted = '[Command] Work History Executed',
  WorkHistoryExecutedSuccess = '[Command] Work History Executed Success',

  IssueExecuted = '[Command] Issue Executed',
  IssueExecutedSuccess = '[Command] Issue Executed Success',

  ContactExecuted = '[Command] Contact Executed',
  ContactExecutedSuccess = '[Command] Contact Executed Success',

  HelpExecuted = '[Command] Help Executed',
  HelpExecutedSuccess = '[Command] Help Executed Success',
}

export class CommandEffectsInit implements Action {
  readonly type = CommandActionTypes.CommandEffectsInit;
  constructor(public payload: InitializedCommand[]) {}
}

export class CommandInitiated implements Action {
  readonly type = CommandActionTypes.CommandInitiated;
  constructor(public payload: string) {}
}

export class CommandExecutedFail implements Action {
  readonly type = CommandActionTypes.CommandExecutedFail;
  constructor(public payload: string) {}
}

export class RandomExecuted implements Action {
  readonly type = CommandActionTypes.RandomExecuted;
  constructor(public payload: RandomInputParams) {}
}

export class RandomExecutedSuccess implements Action {
  readonly type = CommandActionTypes.RandomExecutedSuccess;
  constructor(public payload: RandomCommandExecutedModel) {}
}

export class EducationExecuted implements Action {
  readonly type = CommandActionTypes.EducationExecuted;
  constructor(public payload: EducationInputParams) {}
}

export class EducationExecutedSuccess implements Action {
  readonly type = CommandActionTypes.EducationExecutedSuccess;
  constructor(public payload: EducationExecutedModel) {}
}

export class SkillsExecuted implements Action {
  readonly type = CommandActionTypes.SkillsExecuted;
  constructor(public payload: SkillsInputParams) {}
}

export class SkillsExecutedSuccess implements Action {
  readonly type = CommandActionTypes.SkillsExecutedSuccess;
  constructor(public payload: SkillsExecutedModel) {}
}

export class LinksExecuted implements Action {
  readonly type = CommandActionTypes.LinksExecuted;
  constructor(public payload: LinksInputParams) {}
}

export class LinksExecutedSuccess implements Action {
  readonly type = CommandActionTypes.LinksExecutedSuccess;
  constructor(public payload: LinksExecutedModel) {}
}

export class WorkHistoryExecuted implements Action {
  readonly type = CommandActionTypes.WorkHistoryExecuted;
  constructor(public payload: WorkHistoryInputParams) {}
}

export class WorkHistoryExecutedSuccess implements Action {
  readonly type = CommandActionTypes.WorkHistoryExecutedSuccess;
  constructor(public payload: WorkHistoryExecutedModel) {}
}

export class IssueExecuted implements Action {
  readonly type = CommandActionTypes.IssueExecuted;
  constructor(public payload: IssueInputParams) {}
}

export class IssueExecutedSuccess implements Action {
  readonly type = CommandActionTypes.IssueExecutedSuccess;
  constructor(public payload: IssueExecutedModel) {}
}

export class ContactExecuted implements Action {
  readonly type = CommandActionTypes.ContactExecuted;
  constructor(public payload: ContactInputParams) {}
}

export class ContactExecutedSuccess implements Action {
  readonly type = CommandActionTypes.ContactExecutedSuccess;
  constructor(public payload: ContactExecutedModel) {}
}

export class HelpExecuted implements Action {
  readonly type = CommandActionTypes.HelpExecuted;
  constructor(public payload: HelpInputParams) {}
}

export class HelpExecutedSuccess implements Action {
  readonly type = CommandActionTypes.HelpExecutedSuccess;
  constructor(public payload: HelpExecutedModel) {}
}

export type CommandAction = CommandInitiated
  | CommandEffectsInit
  | CommandExecutedFail
  | RandomExecuted
  | RandomExecutedSuccess
  | EducationExecuted
  | EducationExecutedSuccess
  | SkillsExecuted
  | SkillsExecutedSuccess
  | LinksExecuted
  | LinksExecutedSuccess
  | WorkHistoryExecuted
  | WorkHistoryExecutedSuccess
  | IssueExecuted
  | IssueExecutedSuccess
  | ContactExecuted
  | ContactExecutedSuccess
  | HelpExecuted
  | HelpExecutedSuccess;
