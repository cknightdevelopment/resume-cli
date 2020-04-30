import { Action } from '@ngrx/store';
import { ResumeState } from './resume.reducers';

export enum ResumeActionTypes {
  LoadStaticData = '[Resume] Load Static Data',
  LoadStaticDataSuccess = '[Resume] Load Static Data Success',
  LoadStaticDataError = '[Resume] Load Static Data Error',
}

export class LoadStaticData implements Action {
  readonly type = ResumeActionTypes.LoadStaticData;
}

export class LoadStaticDataSuccess implements Action {
  readonly type = ResumeActionTypes.LoadStaticDataSuccess;
  constructor(public payload: ResumeState) {}
}

export type ResumeAction = LoadStaticData
  | LoadStaticDataSuccess;
