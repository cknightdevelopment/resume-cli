import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { CommandEffects } from './command.effects';
// tslint:disable-next-line: max-line-length
import { RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess, CommandEffectsInit, CommandInitiated, SkillsExecuted, SkillsExecutedSuccess, LinksExecuted, LinksExecutedSuccess, WorkHistoryExecuted, WorkHistoryExecutedSuccess, ContactExecuted, ContactExecutedSuccess, IssueExecuted, IssueExecutedSuccess, HelpExecuted, HelpExecutedSuccess } from './command.actions';
import { CommandService } from 'src/app/core/command/command.service';
import * as factory from 'src/test-helpers/factory/models';
import { CommandFacade } from './command.facade';
import { ResumeFacade } from 'src/app/store/resume/resume.facade';
import { CONSTANTS } from 'src/app/models/constants';
import { InitializedCommand } from './command.reducers';
import { InitializedCommandStorage } from 'src/app/models/command/initialized-command-storage.model';
import { LoadResumeDataSuccess } from 'src/app/store/resume/resume.actions';

class MockCommandService {
  facts = ['Fact1', 'Fact2'];

  getRandomFacts(): string[] {
    return this.facts;
  }
}

class MockCommandFacade {
  date = new Date(2019, 0, 1);

  data = {
    usedFacts: ['Fact3'],
    history: [
      { text: 'test', initializedOn: this.date }
    ] as InitializedCommand[]
  };

  usedFacts$ = of(this.data.usedFacts);
  history$ = of(this.data.history);
}

class MockResumeFacade {
  data = {
    education: [factory.educationModel()],
    facts: ['Fact1', 'Fact2', 'Fact3'],
    skills: [factory.skillSetModel()],
    links: [factory.linkModel()],
    workHistory: [factory.workHistoryModel()],
    contact: factory.contactModel(),
    issue: factory.issueModel(),
    help: factory.helpModel()
  };

  facts$ = of(this.data.facts);
  education$ = of(this.data.education);
  skills$ = of(this.data.skills);
  links$ = of(this.data.links);
  workHistory$ = of(this.data.workHistory);
  contact$ = of(this.data.contact);
  issue$ = of(this.data.issue);
  help$ = of(this.data.help);
}

let actions$: Observable<Action>;

describe('NGRX Effects: Command', () => {
  let effects: CommandEffects;
  let mockCommandSvc: MockCommandService;
  let mockCommandFacade: MockCommandFacade;
  let mockResumeFacade: MockResumeFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandEffects,
        provideMockActions(() => actions$),
        { provide: CommandService, useClass: MockCommandService },
        { provide: CommandFacade, useClass: MockCommandFacade },
        { provide: ResumeFacade, useClass: MockResumeFacade }
      ],
    });

    effects = TestBed.inject(CommandEffects) as any;
    mockCommandSvc = TestBed.inject(CommandService) as any;
    mockCommandFacade = TestBed.inject(CommandFacade) as any;
    mockResumeFacade = TestBed.inject(ResumeFacade) as any;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('resumeDataLoaded$', () => {
    it('should get command history from local storage', () => {
      const date = new Date(2019, 0, 1);
      const storageHistory = [
        { text: 'test', initializedOnEpoch: date.getTime() }
      ] as InitializedCommandStorage[];
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storageHistory));

      actions$ = cold('a', { a: new LoadResumeDataSuccess(null) });
      const expected = cold('a', {
        a: new CommandEffectsInit([
          { text: 'test', initializedOn: date }
        ])
      });

      expect(effects.resumeDataLoaded$).toBeObservable(expected);
      expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY());
    });

    it('should not error when JSON data for local storage entry is malformed', () => {
      const badStorageHistory = '!@#$%^&*() BAD JSON DATA !@#$%^&*()';
      spyOn(localStorage, 'getItem').and.returnValue(badStorageHistory);

      actions$ = cold('a', { a: new LoadResumeDataSuccess(null) });
      const expected = cold('a', { a: new CommandEffectsInit([]) });

      expect(effects.resumeDataLoaded$).toBeObservable(expected);
    });

    it('should not error when JSON data for local storage entry is not an array', () => {
      const nonArrayStorageHistory = { a: 'not an array' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(nonArrayStorageHistory));

      actions$ = cold('a', { a: new LoadResumeDataSuccess(null) });
      const expected = cold('a', { a: new CommandEffectsInit([]) });

      expect(effects.resumeDataLoaded$).toBeObservable(expected);
    });

    it('should filter out storage history items that are falsy, have falsy command text, or invalid dates', () => {
      const date = new Date(2019, 0, 1);
      const storageHistory = [
        { text: 'test', initializedOnEpoch: date.getTime() },
        { text: '', initializedOnEpoch: date.getTime() }, // empty command text
        { text: 'test', initializedOnEpoch: { a: 'BAD EPOCH' } }, // bad date epoch
        null
      ] as InitializedCommandStorage[];
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storageHistory));

      actions$ = cold('a', { a: new LoadResumeDataSuccess(null) });
      const expected = cold('a', {
        a: new CommandEffectsInit([
          { text: 'test', initializedOn: date }
        ])
      });

      expect(effects.resumeDataLoaded$).toBeObservable(expected);
      expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY());
    });
  });

  describe('commandInitiated$', () => {
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
    });

    it('should set local storage command history with valid history items', () => {
      actions$ = cold('a', { a: new CommandInitiated({ text: 'test' }) });

      effects.commandInitiated$.subscribe(x => {
        expect(localStorage.setItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY(), JSON.stringify([
          { text: 'test', initializedOnEpoch: mockCommandFacade.date.getTime() }
        ] as InitializedCommandStorage[]));
      });
    });

    it('should ignore commands initiated that specify to skip history', () => {
      actions$ = cold('a', { a: new CommandInitiated({ text: 'test', skipHistory: true }) });

      const expected = cold('-');
      expect(effects.commandInitiated$).toBeObservable(expected);
    });

    it('should filter out command history items that are falsy, have invalid command text, or invalid initialized on date', () => {
      actions$ = cold('a', { a: new CommandInitiated({ text: 'test' }) });
      mockCommandFacade.data.history.push({ text: 'test2', initializedOn: null });
      mockCommandFacade.data.history.push({ text: '', initializedOn: mockCommandFacade.date });
      mockCommandFacade.data.history.push(null);

      effects.commandInitiated$.subscribe(x => {
        expect(localStorage.setItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY(), JSON.stringify([
          { text: 'test', initializedOnEpoch: mockCommandFacade.date.getTime() }
        ] as InitializedCommandStorage[]));
      });
    });
  });

  describe('random$', () => {
    beforeEach(() => {
      spyOn(mockCommandSvc, 'getRandomFacts').and.callThrough();
    });

    it('should get random facts and call command svc with data from action and state', () => {
      actions$ = cold('a', { a: new RandomExecuted({ count: 3 }) });
      const expected = cold('a', { a: new RandomExecutedSuccess({ facts: mockCommandSvc.facts }) });

      expect(effects.random$).toBeObservable(expected);
      expect(mockCommandSvc.getRandomFacts).toHaveBeenCalledWith(3, ['Fact1', 'Fact2', 'Fact3'], ['Fact3']);
    });

    it('should call get random facts with count of 1 when action count property is falsy', () => {
      actions$ = cold('a', { a: new RandomExecuted({ count: null }) });
      const expected = cold('a', { a: new RandomExecutedSuccess({ facts: mockCommandSvc.facts }) });

      expect(effects.random$).toBeObservable(expected);
      expect(mockCommandSvc.getRandomFacts).toHaveBeenCalledWith(1, ['Fact1', 'Fact2', 'Fact3'], ['Fact3']);
    });
  });

  describe('education$', () => {
    it('should get education data from facade', () => {
      actions$ = cold('a', { a: new EducationExecuted({}) });
      const expected = cold('a', { a: new EducationExecutedSuccess({ education: mockResumeFacade.data.education }) });

      expect(effects.education$).toBeObservable(expected);
    });
  });

  describe('skills$', () => {
    it('should get skills data from facade', () => {
      actions$ = cold('a', { a: new SkillsExecuted({}) });
      const expected = cold('a', { a: new SkillsExecutedSuccess({ skills: mockResumeFacade.data.skills }) });

      expect(effects.skills$).toBeObservable(expected);
    });
  });

  describe('links$', () => {
    it('should get links data from facade', () => {
      actions$ = cold('a', { a: new LinksExecuted({}) });
      const expected = cold('a', { a: new LinksExecutedSuccess({ links: mockResumeFacade.data.links }) });

      expect(effects.links$).toBeObservable(expected);
    });
  });

  describe('work history$', () => {
    it('should get work history data from facade', () => {
      actions$ = cold('a', { a: new WorkHistoryExecuted({}) });
      const expected = cold('a', { a: new WorkHistoryExecutedSuccess({ workHistory: mockResumeFacade.data.workHistory }) });

      expect(effects.workHistory$).toBeObservable(expected);
    });
  });

  describe('contact$', () => {
    it('should get contact data from facade', () => {
      actions$ = cold('a', { a: new ContactExecuted({}) });
      const expected = cold('a', { a: new ContactExecutedSuccess({ contact: mockResumeFacade.data.contact }) });

      expect(effects.contact$).toBeObservable(expected);
    });
  });

  describe('issue$', () => {
    it('should get issue data from facade', () => {
      actions$ = cold('a', { a: new IssueExecuted({ title: 'test title' }) });
      const expected = cold('a', {
        a: new IssueExecutedSuccess({
          issue: {
            ...mockResumeFacade.data.issue,
            title: 'test title'
          }
        })
      });

      expect(effects.issue$).toBeObservable(expected);
    });
  });

  describe('help$', () => {
    it('should get help data from facade', () => {
      actions$ = cold('a', { a: new HelpExecuted({}) });
      const expected = cold('a', { a: new HelpExecutedSuccess({ help: mockResumeFacade.data.help }) });

      expect(effects.help$).toBeObservable(expected);
    });
  });
});
