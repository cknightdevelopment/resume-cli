import { Action } from '@ngrx/store';
import { RandomCommandInputParams } from 'src/app/models/command/input/random-command-input-params.model';
import { RandomCommandExecuted } from 'src/app/models/command/executed/random-command-executed.model';

export enum CommandActionTypes {
  CommandInitiated = '[Command] Command Initiated',

  RandomExecuted = '[Command] Random Executed',
  RandomExecutedSuccess = '[Command] Random Executed Success',
  RandomExecutedFail = '[Command] Random Executed Fail',
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
  constructor(public payload: RandomCommandExecuted) {}
}

export class RandomExecutedFail implements Action {
  readonly type = CommandActionTypes.RandomExecutedFail;
  constructor(public payload: string) {}
}

export type CommandAction = CommandInitiated
  | RandomExecuted
  | RandomExecutedSuccess
  | RandomExecutedFail;
