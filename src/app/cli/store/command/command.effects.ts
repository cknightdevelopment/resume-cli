import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CommandActionTypes, RandomExecuted, RandomExecutedSuccess } from './command.actions';
import { withLatestFrom, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectFacts } from 'src/app/store/chris/chris.selectors';
import { selectUsedFacts } from './command.selectors';
import { CommandService } from 'src/app/core/command/command.service';

@Injectable()
export class CommandEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private commandSvc: CommandService) { }

  @Effect() random$ = this.actions$.pipe(
    ofType<RandomExecuted>(CommandActionTypes.RandomExecuted),
    withLatestFrom(this.store.select(selectFacts), this.store.select(selectUsedFacts)),
    map(([action, allFacts, usedFacts]) => {
      // if no count provided, default to 1
      const count = (action.payload && action.payload.count) || 1;
      const result = this.commandSvc.getRandomFacts(count, allFacts, usedFacts);

      return new RandomExecutedSuccess({ facts: result });
    })
  );
}
