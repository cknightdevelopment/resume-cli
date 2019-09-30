import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from 'src/app/reducers';
import * as fromTerminal from 'src/app/cli/store/terminal/terminal.reducers';

export interface AppState extends fromRoot.AppState {
  cli: CliState;
}

export interface CliState {
  terminal: fromTerminal.TerminalState;
}

export const reducers: ActionReducerMap<CliState> = {
  terminal: fromTerminal.reducer
};
