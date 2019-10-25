import { Action } from '@ngrx/store';
import { ChrisState } from './chris.reducers';

export enum ChrisActionTypes {
  LoadStaticData = '[Chris] Load Static Data',
  LoadStaticDataSuccess = '[Chris] Load Static Data Success',
  LoadStaticDataError = '[Chris] Load Static Data Error',
}

export class LoadStaticData implements Action {
  readonly type = ChrisActionTypes.LoadStaticData;
}

export class LoadStaticDataSuccess implements Action {
  readonly type = ChrisActionTypes.LoadStaticDataSuccess;
  constructor(public payload: ChrisState) {}
}

export type ChrisAction = LoadStaticData
  | LoadStaticDataSuccess;
