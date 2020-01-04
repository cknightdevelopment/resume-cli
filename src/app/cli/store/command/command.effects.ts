import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Injectable } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { CommandActionTypes, RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess, CommandEffectsInit, CommandInitiated, SkillsExecutedSuccess, LinksExecutedSuccess, WorkHistoryExecuted, WorkHistoryExecutedSuccess, LinksExecuted, IssueExecuted, IssueExecutedSuccess, ContactExecuted, ContactExecutedSuccess } from './command.actions';
import { withLatestFrom, map, tap } from 'rxjs/operators';
import { CommandService } from 'src/app/core/command/command.service';
import { CommandFacade } from './command.facade';
import { ChrisFacade } from 'src/app/store/chris/chris.facade';
import { Action } from '@ngrx/store';
import { CONSTANTS } from 'src/app/models/constants';
import { InitializedCommandStorage } from 'src/app/models/command/initialized-command-storage.model';
import { InitializedCommand } from './command.reducers';
import { isValidDate } from 'src/app/util';

@Injectable()
export class CommandEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private chrisFacade: ChrisFacade,
    private commandFacade: CommandFacade,
    private commandSvc: CommandService
  ) { }

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

      localStorage.setItem(CONSTANTS.STORAGE_KEYS.HISTORY, JSON.stringify(storageHistory));
    })
  );

  @Effect() random$ = this.actions$.pipe(
    ofType<RandomExecuted>(CommandActionTypes.RandomExecuted),
    withLatestFrom(this.chrisFacade.facts$, this.commandFacade.usedFacts$),
    map(([action, allFacts, usedFacts]) => {
      // if no count provided, default to 1
      const count = (action.payload && action.payload.count) || 1;
      const result = this.commandSvc.getRandomFacts(count, allFacts, usedFacts);

      return new RandomExecutedSuccess({ facts: result });
    })
  );

  @Effect() education$ = this.actions$.pipe(
    ofType<EducationExecuted>(CommandActionTypes.EducationExecuted),
    withLatestFrom(this.chrisFacade.education$),
    map(([action, education]) => {
      return new EducationExecutedSuccess({ college: education.college });
    })
  );

  @Effect() skills$ = this.actions$.pipe(
    ofType<EducationExecuted>(CommandActionTypes.SkillsExecuted),
    withLatestFrom(this.chrisFacade.skills$),
    map(([action, skills]) => {
      return new SkillsExecutedSuccess({ skills });
    })
  );

  @Effect() links$ = this.actions$.pipe(
    ofType<LinksExecuted>(CommandActionTypes.LinksExecuted),
    withLatestFrom(this.chrisFacade.links$),
    map(([action, links]) => {
      return new LinksExecutedSuccess({ links });
    })
  );

  @Effect() workHistory$ = this.actions$.pipe(
    ofType<WorkHistoryExecuted>(CommandActionTypes.WorkHistoryExecuted),
    withLatestFrom(this.chrisFacade.workHistory$),
    map(([action, workHistory]) => {
      return new WorkHistoryExecutedSuccess({ workHistory });
    })
  );

  @Effect() issue$ = this.actions$.pipe(
    ofType<IssueExecuted>(CommandActionTypes.IssueExecuted),
    withLatestFrom(this.chrisFacade.issue$),
    map(([action, issue]) => {
      return new IssueExecutedSuccess({ issue });
    })
  );

  @Effect() contact$ = this.actions$.pipe(
    ofType<ContactExecuted>(CommandActionTypes.ContactExecuted),
    withLatestFrom(this.chrisFacade.contact$),
    map(([action, contact]) => {
      return new ContactExecutedSuccess({ contact });
    })
  );

  ngrxOnInitEffects(): Action {
    let history = [] as InitializedCommand[];

    try {
      const raw = localStorage.getItem(CONSTANTS.STORAGE_KEYS.HISTORY);
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
  }
}
