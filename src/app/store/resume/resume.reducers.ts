import { ResumeAction, ResumeActionTypes } from './resume.actions';
// eslint-disable-next-line max-len
import { EducationModel, SkillSetModel, LinkModel, WorkHistoryModel, ContactModel, IssueModel, HelpModel } from 'src/app/models/resume/resume-data.model';

export interface ResumeState {
  facts: string[];
  education: EducationModel[];
  skills: SkillSetModel[];
  links: LinkModel[];
  workHistory: WorkHistoryModel[];
  contact: ContactModel;
  issue: IssueModel;
  help: HelpModel;
}

export const intitalState: ResumeState = {
  facts: [],
  education: [],
  skills: [],
  links: [],
  workHistory: [],
  contact: null,
  issue: null,
  help: null
};

export function reducer(state = intitalState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case ResumeActionTypes.LoadResumeDataSuccess:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
}
