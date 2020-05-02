import { Action } from '@ngrx/store';
import { ResumeState } from './resume.reducers';

export enum ResumeActionTypes {
  LoadResumeData = '[Resume] Load Resume Data',
  LoadResumeDataSuccess = '[Resume] Load Resume Data Success',
  LoadResumeDataError = '[Resume] Load Resume Data Error',
}

export class LoadResumeData implements Action {
  readonly type = ResumeActionTypes.LoadResumeData;
}

export class LoadResumeDataSuccess implements Action {
  readonly type = ResumeActionTypes.LoadResumeDataSuccess;
  constructor(public payload: ResumeState) {}
}

export type ResumeAction = LoadResumeData
  | LoadResumeDataSuccess;
