import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { CommandActionTypes, RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess, CommandEffectsInit, CommandInitiated, SkillsExecutedSuccess, LinksExecutedSuccess, WorkHistoryExecuted, WorkHistoryExecutedSuccess, LinksExecuted, IssueExecuted, IssueExecutedSuccess, ContactExecuted, ContactExecutedSuccess, HelpExecuted, HelpExecutedSuccess } from './command.actions';
import { withLatestFrom, map, tap } from 'rxjs/operators';
import { CommandService } from 'src/app/core/command/command.service';
import { CommandFacade } from './command.facade';
import { ResumeFacade } from 'src/app/store/resume/resume.facade';
import { CONSTANTS } from 'src/app/models/constants';
import { InitializedCommandStorage } from 'src/app/models/command/initialized-command-storage.model';
import { InitializedCommand } from './command.reducers';
import { isValidDate } from 'src/app/util';
import { ResumeActionTypes, LoadResumeDataSuccess } from 'src/app/store/resume/resume.actions';

@Injectable()
export class CommandEffects {
  constructor(
    private actions$: Actions,
    private resumeFacade: ResumeFacade,
    private commandFacade: CommandFacade,
    private commandSvc: CommandService
  ) { }

  @Effect() resumeDataLoaded$ = this.actions$.pipe(
    ofType<LoadResumeDataSuccess>(ResumeActionTypes.LoadResumeDataSuccess),
    map(() => {
      let history = [] as InitializedCommand[];

      try {
        const raw = localStorage.getItem(CONSTANTS.STORAGE_KEYS.HISTORY());
        const parseResult = JSON.parse(raw) as InitializedCommandStorage[];

        if (Array.isArray(parseResult)) {
          history = parseResult
            .filter(item => !!item)
            .map(item => ({
              text: item.text,
              initializedOn: new Date(item.initializedOnEpoch)
            }))
            .filter(x => !!x.text && isValidDate(x.initializedOn));
        }
      } catch (error) {
      }
      return new CommandEffectsInit(history);
    }),
  );

  @Effect({ dispatch: false }) commandInitiated$ = this.actions$.pipe(
    ofType<CommandInitiated>(CommandActionTypes.CommandInitiated),
    withLatestFrom(this.commandFacade.history$),
    tap(([action, history]) => {
      // whenever history changes, update the local storage
      const storageHistory = history
        .filter(item => !!item && !!item.text && isValidDate(item.initializedOn))
        .map(item => ({
          text: item.text,
          initializedOnEpoch: item.initializedOn.getTime()
        } as InitializedCommandStorage));

      localStorage.setItem(CONSTANTS.STORAGE_KEYS.HISTORY(), JSON.stringify(storageHistory));
    })
  );

  @Effect() random$ = this.actions$.pipe(
    ofType<RandomExecuted>(CommandActionTypes.RandomExecuted),
    withLatestFrom(this.resumeFacade.facts$, this.commandFacade.usedFacts$),
    map(([action, allFacts, usedFacts]) => {
      // if no count provided, default to 1
      const count = (action.payload && action.payload.count) || 1;
      const result = this.commandSvc.getRandomFacts(count, allFacts, usedFacts);

      return new RandomExecutedSuccess({ facts: result });
    })
  );

  @Effect() education$ = this.actions$.pipe(
    ofType<EducationExecuted>(CommandActionTypes.EducationExecuted),
    withLatestFrom(this.resumeFacade.education$),
    map(([action, education]) => {
      return new EducationExecutedSuccess({ education });
    })
  );

  @Effect() skills$ = this.actions$.pipe(
    ofType<EducationExecuted>(CommandActionTypes.SkillsExecuted),
    withLatestFrom(this.resumeFacade.skills$),
    map(([action, skills]) => {
      return new SkillsExecutedSuccess({ skills });
    })
  );

  @Effect() links$ = this.actions$.pipe(
    ofType<LinksExecuted>(CommandActionTypes.LinksExecuted),
    withLatestFrom(this.resumeFacade.links$),
    map(([action, links]) => {
      return new LinksExecutedSuccess({ links });
    })
  );

  @Effect() workHistory$ = this.actions$.pipe(
    ofType<WorkHistoryExecuted>(CommandActionTypes.WorkHistoryExecuted),
    withLatestFrom(this.resumeFacade.workHistory$),
    map(([action, workHistory]) => {
      return new WorkHistoryExecutedSuccess({ workHistory });
    })
  );

  @Effect() issue$ = this.actions$.pipe(
    ofType<IssueExecuted>(CommandActionTypes.IssueExecuted),
    withLatestFrom(this.resumeFacade.issue$),
    map(([action, issue]) => {
      return new IssueExecutedSuccess({ issue: { url: issue.url, title: action.payload.title } });
    })
  );

  @Effect() contact$ = this.actions$.pipe(
    ofType<ContactExecuted>(CommandActionTypes.ContactExecuted),
    withLatestFrom(this.resumeFacade.contact$),
    map(([action, contact]) => {
      return new ContactExecutedSuccess({ contact });
    })
  );

  @Effect() help$ = this.actions$.pipe(
    ofType<HelpExecuted>(CommandActionTypes.HelpExecuted),
    withLatestFrom(this.resumeFacade.help$),
    map(([action, help]) => {
      return new HelpExecutedSuccess({ help });
    })
  );
}
