import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ChrisState } from './chris.reducers';


const selectChris = (state: AppState) => state.chris;

export const selectFacts = createSelector(
  selectChris,
  (state: ChrisState) => state.facts
);

export const selectEducation = createSelector(
  selectChris,
  (state: ChrisState) => state.education
);

export const selectSkills = createSelector(
  selectChris,
  (state: ChrisState) => state.skills
);

export const selectLinks = createSelector(
  selectChris,
  (state: ChrisState) => state.links
);

export const selectWorkHistory = createSelector(
  selectChris,
  (state: ChrisState) => state.workHistory
);

export const selectContact = createSelector(
  selectChris,
  (state: ChrisState) => state.contact
);

export const selectIssue = createSelector(
  selectChris,
  (state: ChrisState) => state.issue
);
