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
