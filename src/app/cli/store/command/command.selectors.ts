import { CliState } from '..';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';


const selectCli = createFeatureSelector<CliState>('cli');

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
  command => command.history.slice().sort((a, b) => {
    return b.initializedOn > a.initializedOn ? 1 : -1;
  })
);

export const selectUsedFacts = createSelector(
  selectCommand,
  command => command.usedFacts
);

export const selectRandomExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.random
);

export const selectEducationExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.education
);

export const selectSkillsExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.skills
);

export const selectLinksExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.links
);

export const selectWorkHistoryExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.workHistory
);

export const selectContactExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.contact
);

export const selectIssueExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.issue
);

export const selectHelpExecutionData = createSelector(
  selectCommand,
  command => command.executed && command.executed.help
);
