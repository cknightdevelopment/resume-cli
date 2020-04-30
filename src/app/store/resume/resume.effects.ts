import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { LoadStaticData, LoadStaticDataSuccess, ResumeActionTypes } from './resume.actions';
import { ResumeService } from 'src/app/core/resume/resume.service';
import { CONSTANTS } from 'src/app/models/constants';

@Injectable()
export class ResumeEffects {
  constructor(private actions$: Actions, private resumeDataSvc: ResumeService) { }

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new LoadStaticData())
  );

  @Effect() loadStaticData$ = this.actions$.pipe(
    ofType(ResumeActionTypes.LoadStaticData),
    mergeMap(() => this.resumeDataSvc.getData()),
    tap(data => {
      // set cli name in constants
      let cliName = data && data.cliName && data.cliName.trim();
      cliName = cliName && cliName.split(' ')[0];
      if (cliName) {
        CONSTANTS.CLI_NAME = cliName;
      }
    }),
    map(data => new LoadStaticDataSuccess({
      facts: data.facts,
      education: data.education,
      skills: data.skills,
      links: data.links,
      workHistory: data.workHistory,
      contact: data.contact,
      issue: data.issue,
      help: data.help
    }))
  );
}
