import { Action } from '@ngrx/store';

export enum CommandActionTypes {
  CommandInitiated = '[Command] Command Initiated',
}

export class CommandInitiated implements Action {
  readonly type = CommandActionTypes.CommandInitiated;
  constructor(public payload: string) {}
}

export type CommandAction = CommandInitiated;
