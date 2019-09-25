import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  test: string;
}

export const reducers: ActionReducerMap<State> = {
  test: (state, action) => null
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
