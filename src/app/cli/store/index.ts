import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from 'src/app/store';
import * as fromTerminal from 'src/app/cli/store/terminal/terminal.reducers';
import * as fromCommand from 'src/app/cli/store/command/command.reducers';

export interface AppState extends fromRoot.AppState {
  cli: CliState;
}

export interface CliState {
  terminal: fromTerminal.TerminalState;
  command: fromCommand.CommandState;
}

export const reducers: ActionReducerMap<CliState> = {
  terminal: fromTerminal.reducer,
  command: fromCommand.reducer
};
