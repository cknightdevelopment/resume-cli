import { Action } from '@ngrx/store';

export class NoopAction implements Action {
  readonly type = '[Test] Noop';
}
