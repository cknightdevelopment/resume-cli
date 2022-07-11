import { CliState } from '..';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TerminalState } from './terminal.reducers';
import { AppState } from 'src/app/store';


export const selectCli = createFeatureSelector<CliState>('cli');

export const selectTerminal = createSelector(
  selectCli,
  (state: CliState) => state.terminal
);

export const selectTerminalSettings = createSelector(
  selectTerminal,
  (terminal: TerminalState) => terminal.settings
);
