import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCli from '../cli/store';
import * as fromResume from './resume/resume.reducers';

export interface AppState {
  resume: fromResume.ResumeState;
  cli?: fromCli.CliState;
}

export const reducers: ActionReducerMap<AppState> = {
  resume: fromResume.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
