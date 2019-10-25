import { ChrisAction, ChrisActionTypes } from './chris.actions';

export interface ChrisState {
  facts: string[];
}

export const intitalState: ChrisState = {
  facts: []
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
