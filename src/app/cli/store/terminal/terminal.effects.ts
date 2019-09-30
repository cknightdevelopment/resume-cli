import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SettingsUpdated, TerminalActionTypes } from './terminal.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) { }

  // @Effect({ dispatch: false }) login$ = this.actions$.pipe(
  //   ofType(TerminalActionTypes.SettingsChanged),

  // );
}
