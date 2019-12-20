import { ChrisAction, ChrisActionTypes } from './chris.actions';
import { EducationModel } from 'src/app/models/chris/chris-data.model';

export interface ChrisState {
  facts: string[];
  education: EducationModel;
}

export const intitalState: ChrisState = {
  facts: [],
  education: null
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
