import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { Observable } from 'rxjs';
import { ChrisAction } from './chris.actions';
import { selectFacts } from './chris.selectors';

@Injectable()
export class ChrisFacade {
  facts$: Observable<string[]> = this.store.select(selectFacts);

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: ChrisAction): void {
    this.store.dispatch(action);
  }
}
