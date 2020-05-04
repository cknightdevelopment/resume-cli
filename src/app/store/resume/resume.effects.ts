import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, tap, filter, catchError } from 'rxjs/operators';
import { LoadResumeData, LoadResumeDataSuccess, ResumeActionTypes } from './resume.actions';
import { ResumeService } from 'src/app/core/resume/resume.service';
import { CONSTANTS } from 'src/app/models/constants';
import { Router, ResolveStart } from '@angular/router';
import { InitHelpTypes, CustomizableResumeDataModel } from 'src/app/models/resume/resume-data.model';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    mergeMap(resumeDataUrl => {
      resumeDataUrl = resumeDataUrl || environment.exampleResumeUrl;

      return this.resumeDataSvc.getData(resumeDataUrl).pipe(
        catchError(err => {
          // tslint:disable-next-line: max-line-length
          const message = CONSTANTS.ERROR_MESSAGES.GET_RESUME_DATA(resumeDataUrl);

          alert(message);
          console.error(message, err);

          return of({} as CustomizableResumeDataModel);
        })
      );
    }
    ),
    tap(data => this.updateConstantsCliOptions(data)),
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

  private updateConstantsCliOptions(data: CustomizableResumeDataModel): void {
    CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS = {
      [CommandNames.Random]: data && !!data.facts && !!data.facts.length,
      [CommandNames.Education]: data && data.education && !!data.education.length,
      [CommandNames.Skills]: data && data.skills && !!data.skills.length,
      [CommandNames.Links]: data && data.links && !!data.links.length,
      [CommandNames.WorkHistory]: data && data.workHistory && !!data.workHistory.length,
      [CommandNames.Contact]: data && !!data.contact,
      [CommandNames.Issue]: true,
      [CommandNames.Help]: true
    };

    if (data && data.options) {
      // update cli name in constants, if provided
      // NOTE: update cli name first because other items depend on it
      let cliName = data.options.cliName && data.options.cliName.trim();
      cliName = cliName && cliName.split(' ')[0];
      if (cliName) {
        CONSTANTS.CLI_OPTIONS.NAME = cliName;
      }

      // update init help in constants, if provided
      const initHelp = data.options.initHelp;
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
}
