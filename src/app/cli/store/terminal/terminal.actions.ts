import { Action } from '@ngrx/store';
import { TerminalSettings } from './terminal.reducers';

export enum TerminalActionTypes {
  SettingsUpdated = '[Terminal] Settings Updated',
}

export class SettingsUpdated implements Action {
  readonly type = TerminalActionTypes.SettingsUpdated;
  constructor(public payload: Partial<TerminalSettings>) {}
}

export type TerminalAction = SettingsUpdated;
