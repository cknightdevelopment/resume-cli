import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CommandAction } from './command.actions';
// tslint:disable-next-line: max-line-length
import { selectHistory, selectInitializedCommand, selectRandomExecutionData, selectUsedFacts, selectEducationExecutionData } from './command.selectors';

@Injectable()
export class CommandFacade {
  initializedCommand$ = this.store.select(selectInitializedCommand);
  history$ = this.store.select(selectHistory);
  usedFacts$ = this.store.select(selectUsedFacts);
  commandData = {
    random$: this.store.select(selectRandomExecutionData),
    education$: this.store.select(selectEducationExecutionData),
  };

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: CommandAction): void {
    this.store.dispatch(action);
  }
}
