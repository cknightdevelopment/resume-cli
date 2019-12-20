import { Action } from '@ngrx/store';
import { RandomCommandInputParams } from 'src/app/models/command/input/random-command-input-params.model';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { EducationInputParams } from 'src/app/models/command/input/education-input-params.model';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';

export enum CommandActionTypes {
  CommandInitiated = '[Command] Command Initiated',

  RandomExecuted = '[Command] Random Executed',
  RandomExecutedSuccess = '[Command] Random Executed Success',
  RandomExecutedFail = '[Command] Random Executed Fail',

  EducationExecuted = '[Command] Education Executed',
  EducationExecutedSuccess = '[Command] Education Executed Success',
  EducationExecutedFail = '[Command] Education Executed Fail',
}

export class CommandInitiated implements Action {
  readonly type = CommandActionTypes.CommandInitiated;
  constructor(public payload: string) {}
}

export class RandomExecuted implements Action {
  readonly type = CommandActionTypes.RandomExecuted;
  constructor(public payload: RandomCommandInputParams) {}
}

export class RandomExecutedSuccess implements Action {
  readonly type = CommandActionTypes.RandomExecutedSuccess;
  constructor(public payload: RandomCommandExecutedModel) {}
}

export class RandomExecutedFail implements Action {
  readonly type = CommandActionTypes.RandomExecutedFail;
  constructor(public payload: string) {}
}

export class EducationExecuted implements Action {
  readonly type = CommandActionTypes.EducationExecuted;
  constructor(public payload: EducationInputParams) {}
}

export class EducationExecutedSuccess implements Action {
  readonly type = CommandActionTypes.EducationExecutedSuccess;
  constructor(public payload: EducationExecutedModel) {}
}

export class EducationExecutedFail implements Action {
  readonly type = CommandActionTypes.EducationExecutedFail;
  constructor(public payload: string) {}
}

export type CommandAction = CommandInitiated
  | RandomExecuted
  | RandomExecutedSuccess
  | RandomExecutedFail
  | EducationExecuted
  | EducationExecutedSuccess
  | EducationExecutedFail;
