import { CliState } from '..';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TerminalState } from './terminal.reducers';
import { AppState } from 'src/app/reducers';


export const selectCli = createFeatureSelector<AppState, CliState>('cli');

export const selectTerminal = createSelector(
  selectCli,
  (state: CliState) => state.terminal
);

export const selectTerminalSettings = createSelector(
  selectTerminal,
  (terminal: TerminalState) => terminal.settings
);
