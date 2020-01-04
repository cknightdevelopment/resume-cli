import { ChrisAction, ChrisActionTypes } from './chris.actions';
// tslint:disable-next-line: max-line-length
import { EducationModel, SkillSetModel, LinkModel, WorkHistoryModel, ContactModel, IssueModel } from 'src/app/models/chris/chris-data.model';

export interface ChrisState {
  facts: string[];
  education: EducationModel;
  skills: SkillSetModel[];
  links: LinkModel[];
  workHistory: WorkHistoryModel[];
  contact: ContactModel;
  issue: IssueModel;
}

export const intitalState: ChrisState = {
  facts: [],
  education: null,
  skills: [],
  links: [],
  workHistory: [],
  contact: null,
  issue: null
};

export function reducer(state = intitalState, action: ChrisAction): ChrisState {
  switch (action.type) {
    case ChrisActionTypes.LoadStaticDataSuccess:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
}
