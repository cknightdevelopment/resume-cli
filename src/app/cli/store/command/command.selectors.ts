import { CliState } from '..';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';


const selectCli = createFeatureSelector<AppState, CliState>('cli');

const selectCommand = createSelector(
  selectCli,
  cli => cli.command
);

export const selectInitializedCommand = createSelector(
  selectCommand,
  command => command.initializedCommand
);

export const selectHistory = createSelector(
  selectCommand,
  // todo: filter out repeats next to each other
  command => command.history.slice().sort((a, b) => {
    return b.initializedOn > a.initializedOn ? 1 : -1;
  })
);

export const selectUsedFacts = createSelector(
  selectCommand,
  command => command.usedFacts
);

export const selectRandomData = createSelector(
  selectCommand,
  command => command.executed && command.executed.random
);
