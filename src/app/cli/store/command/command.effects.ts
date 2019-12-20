import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CommandActionTypes, RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess } from './command.actions';
import { withLatestFrom, map } from 'rxjs/operators';
import { CommandService } from 'src/app/core/command/command.service';
import { CommandFacade } from './command.facade';
import { ChrisFacade } from 'src/app/store/chris/chris.facade';

@Injectable()
export class CommandEffects {
  constructor(
    private actions$: Actions,
    private chrisFacade: ChrisFacade,
    private commandFacade: CommandFacade,
    private commandSvc: CommandService
  ) { }

  @Effect() random$ = this.actions$.pipe(
    ofType<RandomExecuted>(CommandActionTypes.RandomExecuted),
    withLatestFrom(this.chrisFacade.facts$, this.commandFacade.usedFacts$),
    map(([action, allFacts, usedFacts]) => {
      // if no count provided, default to 1
      const count = (action.payload && action.payload.count) || 1;
      const result = this.commandSvc.getRandomFacts(count, allFacts, usedFacts);

      return new RandomExecutedSuccess({ facts: result  });
    })
  );

  @Effect() education$ = this.actions$.pipe(
    ofType<EducationExecuted>(CommandActionTypes.EducationExecuted),
    withLatestFrom(this.chrisFacade.education$),
    map(([action, education]) => {
      return new EducationExecutedSuccess({ college: education.college });
    })
  );
}
