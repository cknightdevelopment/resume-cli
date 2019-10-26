import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CommandAction } from './command.actions';
import { selectHistory } from './command.selectors';

@Injectable()
export class CommandFacade {
  history$ = this.store.select(selectHistory);

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: CommandAction): void {
    this.store.dispatch(action);
  }
}
