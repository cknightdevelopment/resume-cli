import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCli from '../cli/store';
import * as fromChris from './chris/chris.reducers';

export interface AppState {
  chris: fromChris.ChrisState;
  cli?: fromCli.CliState;
}

export const reducers: ActionReducerMap<AppState> = {
  chris: fromChris.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
