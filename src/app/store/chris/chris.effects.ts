import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { LoadStaticData, LoadStaticDataSuccess, ChrisActionTypes } from './chris.actions';
import { ChrisService } from 'src/app/core/chris/chris.service';

@Injectable()
export class ChrisEffects {
  constructor(private actions$: Actions, private chrisDataSvc: ChrisService) { }

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new LoadStaticData())
  );

  @Effect() loadStaticData$ = this.actions$.pipe(
    ofType(ChrisActionTypes.LoadStaticData),
    mergeMap(() => this.chrisDataSvc.getFacts()),
    map(facts => new LoadStaticDataSuccess({ facts }))
  );
}
