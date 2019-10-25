import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CommandAction } from './command.actions';

@Injectable()
export class CommandFacade {
  constructor(private store: Store<AppState>) {
  }

  dispatch(action: CommandAction): void {
    this.store.dispatch(action);
  }
}
