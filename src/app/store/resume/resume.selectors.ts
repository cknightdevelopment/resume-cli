import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ResumeState } from './resume.reducers';


const selectResume = (state: AppState) => state.resume;

export const selectFacts = createSelector(
  selectResume,
  (state: ResumeState) => state.facts
);

export const selectEducation = createSelector(
  selectResume,
  (state: ResumeState) => state.education
);

export const selectSkills = createSelector(
  selectResume,
  (state: ResumeState) => state.skills
);

export const selectLinks = createSelector(
  selectResume,
  (state: ResumeState) => state.links
);

export const selectWorkHistory = createSelector(
  selectResume,
  (state: ResumeState) => state.workHistory
);

export const selectContact = createSelector(
  selectResume,
  (state: ResumeState) => state.contact
);

export const selectIssue = createSelector(
  selectResume,
  (state: ResumeState) => state.issue
);

export const selectHelp = createSelector(
  selectResume,
  (state: ResumeState) => state.help
);
