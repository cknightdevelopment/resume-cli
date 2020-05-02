import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, tap, filter, switchMap } from 'rxjs/operators';
import { LoadResumeData, LoadResumeDataSuccess, ResumeActionTypes } from './resume.actions';
import { ResumeService } from 'src/app/core/resume/resume.service';
import { CONSTANTS } from 'src/app/models/constants';
import { Router, ResolveStart } from '@angular/router';
import { CliOptionsModel, InitHelpTypes } from 'src/app/models/resume/resume-data.model';

@Injectable()
export class ResumeEffects {
  constructor(private actions$: Actions, private resumeDataSvc: ResumeService, private router: Router) {
  }

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new LoadResumeData())
  );

  @Effect() loadStaticData$ = this.actions$.pipe(
    ofType(ResumeActionTypes.LoadResumeData),
    mergeMap(() => {
      return this.router.events.pipe(
        filter(e => e instanceof ResolveStart),
        map((e: ResolveStart) => {
          const matchingParamKey = Object.keys(e.state.root.queryParams)
            .find(key => key.toLowerCase() === CONSTANTS.QUERY_STRING_PARAMS.RESUME_DATA_URL.toLowerCase());

          return matchingParamKey && e.state.root.queryParams[matchingParamKey];
        })
      );
    }),
    mergeMap(resumeDataUrl => this.resumeDataSvc.getData(resumeDataUrl)),
    tap(data => this.updateConstantsCliOptions(data && data.options)),
    map(data => new LoadResumeDataSuccess({
      facts: data.facts,
      education: data.education,
      skills: data.skills,
      links: data.links,
      workHistory: data.workHistory,
      contact: data.contact,
      issue: CONSTANTS.ISSUE,
      help: CONSTANTS.HELP
    }))
  );

  private updateConstantsCliOptions(options: CliOptionsModel): void {
    if (!options) {
      return;
    }

    // update cli name in constants, if provided
    // NOTE: update cli name first because other items depend on it
    let cliName = options.cliName && options.cliName.trim();
    cliName = cliName && cliName.split(' ')[0];
    if (cliName) {
      CONSTANTS.CLI_OPTIONS.NAME = cliName;
    }

    // update init help in constants, if provided
    const initHelp = options.initHelp;
    if (initHelp) {
      let showHelp = true;

      switch (initHelp) {
        case InitHelpTypes.Never:
          showHelp = false;
          break;
        case InitHelpTypes.First:
          try {
            const helpInitStorage = localStorage.getItem(CONSTANTS.STORAGE_KEYS.HELP_INIT());
            showHelp = !helpInitStorage || !JSON.parse(helpInitStorage);
          } catch (error) {
            // no need to do anything here
          }
          break;
      }

      CONSTANTS.CLI_OPTIONS.INIT_HELP = showHelp;
    }
  }
}
