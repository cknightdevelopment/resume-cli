import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CommandAction } from './command.actions';
import { selectHistory, selectInitializedCommand, selectRandomData } from './command.selectors';

@Injectable()
export class CommandFacade {
  initializedCommand$ = this.store.select(selectInitializedCommand);
  history$ = this.store.select(selectHistory);
  commandData = {
    random$: this.store.select(selectRandomData)
  };

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: CommandAction): void {
    this.store.dispatch(action);
  }
}
