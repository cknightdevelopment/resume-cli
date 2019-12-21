import { Action } from '@ngrx/store';
import { RandomCommandInputParams } from 'src/app/models/command/input/random-command-input-params.model';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { EducationInputParams } from 'src/app/models/command/input/education-input-params.model';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';
import { InitializedCommand } from './command.reducers';

export enum CommandActionTypes {
  CommandEffectsInit = '[Command] Effects Init',
  CommandInitiated = '[Command] Command Initiated',
  CommandExecutedFail = '[Command] Executed Fail',

  RandomExecuted = '[Command] Random Executed',
  RandomExecutedSuccess = '[Command] Random Executed Success',

  EducationExecuted = '[Command] Education Executed',
  EducationExecutedSuccess = '[Command] Education Executed Success',
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
  constructor(public payload: RandomCommandInputParams) {}
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

export type CommandAction = CommandInitiated
  | CommandExecutedFail
  | RandomExecuted
  | RandomExecutedSuccess
  | EducationExecuted
  | EducationExecutedSuccess
  | CommandEffectsInit;
