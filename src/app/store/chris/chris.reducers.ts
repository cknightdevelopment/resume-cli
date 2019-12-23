import { ChrisAction, ChrisActionTypes } from './chris.actions';
import { EducationModel, SkillSetModel } from 'src/app/models/chris/chris-data.model';

export interface ChrisState {
  facts: string[];
  education: EducationModel;
  skills: SkillSetModel[];
}

export const intitalState: ChrisState = {
  facts: [],
  education: null,
  skills: []
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
