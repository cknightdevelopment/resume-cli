import { CliState } from '..';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';


const selectCli = createFeatureSelector<AppState, CliState>('cli');

const selectCommand = createSelector(
  selectCli,
  cli => cli.command
);

export const selectHistory = createSelector(
  selectCommand,
  command => command.history.slice().sort((a, b) => {
    return b.initializedOn > a.initializedOn ? 1 : -1;
  })
);
