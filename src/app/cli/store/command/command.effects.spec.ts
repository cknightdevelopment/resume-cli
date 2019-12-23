import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { CommandEffects } from './command.effects';
// tslint:disable-next-line: max-line-length
import { RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess, CommandEffectsInit, CommandInitiated, SkillsExecuted, SkillsExecutedSuccess } from './command.actions';
import { CommandService } from 'src/app/core/command/command.service';
import * as factory from 'src/test-helpers/factory/models';
import { CommandFacade } from './command.facade';
import { ChrisFacade } from 'src/app/store/chris/chris.facade';
import { CONSTANTS } from 'src/app/models/constants';
import { InitializedCommand } from './command.reducers';
import { InitializedCommandStorage } from 'src/app/models/command/initialized-command-storage.model';

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

class MockChrisFacade {
  data = {
    education: factory.educationModel(),
    facts: ['Fact1', 'Fact2', 'Fact3'],
    skills: [factory.skillSetModel()]
  };

  facts$ = of(this.data.facts);
  education$ = of(this.data.education);
  skills$ = of(this.data.skills);
}

let actions$: Observable<Action>;

describe('NGRX Effects: Command', () => {
  let effects: CommandEffects;
  let mockCommandSvc: MockCommandService;
  let mockCommandFacade: MockCommandFacade;
  let mockChrisFacade: MockChrisFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandEffects,
        provideMockActions(() => actions$),
        { provide: CommandService, useClass: MockCommandService },
        { provide: CommandFacade, useClass: MockCommandFacade },
        { provide: ChrisFacade, useClass: MockChrisFacade }
      ],
    });

    effects = TestBed.get(CommandEffects);
    mockCommandSvc = TestBed.get(CommandService);
    mockCommandFacade = TestBed.get(CommandFacade);
    mockChrisFacade = TestBed.get(ChrisFacade);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('ngrxOnInitEffects', () => {
    it('should get command history from local storage', () => {
      const date = new Date(2019, 0, 1);
      const storageHistory = [
        { text: 'test', initializedOnEpoch: date.getTime() }
      ] as InitializedCommandStorage[];
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storageHistory));

      const actionResult = effects.ngrxOnInitEffects() as CommandEffectsInit;

      expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY);
      expect(actionResult).toEqual(new CommandEffectsInit([
        { text: 'test', initializedOn: date }
      ]));
    });

    it('should not error when JSON data for local storage entry is malformed', () => {
      const badStorageHistory = '!@#$%^&*() BAD JSON DATA !@#$%^&*()';
      spyOn(localStorage, 'getItem').and.returnValue(badStorageHistory);

      const actionResult = effects.ngrxOnInitEffects() as CommandEffectsInit;

      expect(actionResult).toEqual(new CommandEffectsInit([]));
    });

    it('should not error when JSON data for local storage entry is not an array', () => {
      const nonArrayStorageHistory = { a: 'not an array' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(nonArrayStorageHistory));

      const actionResult = effects.ngrxOnInitEffects() as CommandEffectsInit;

      expect(actionResult).toEqual(new CommandEffectsInit([]));
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

      const actionResult = effects.ngrxOnInitEffects() as CommandEffectsInit;

      expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY);
      expect(actionResult).toEqual(new CommandEffectsInit([
        { text: 'test', initializedOn: date }
      ]));
    });
  });

  describe('commandInitiated$', () => {
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
    });

    it('should set local storage command history with valid history items', () => {
      actions$ = cold('a', { a: new CommandInitiated('test') });

      effects.commandInitiated$.subscribe(x => {
        expect(localStorage.setItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY, JSON.stringify([
          { text: 'test', initializedOnEpoch: mockCommandFacade.date.getTime() }
        ] as InitializedCommandStorage[]));
      });
    });

    it('should filter out command history items that are falsy, have invalid command text, or invalid initialized on date', () => {
      actions$ = cold('a', { a: new CommandInitiated('test') });
      mockCommandFacade.data.history.push({ text: 'test2', initializedOn: null });
      mockCommandFacade.data.history.push({ text: '', initializedOn: mockCommandFacade.date });
      mockCommandFacade.data.history.push(null);

      effects.commandInitiated$.subscribe(x => {
        expect(localStorage.setItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HISTORY, JSON.stringify([
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
      const expected = cold('a', { a: new EducationExecutedSuccess(mockChrisFacade.data.education) });

      expect(effects.education$).toBeObservable(expected);
    });
  });

  describe('skills$', () => {
    it('should get skills data from facade', () => {
      actions$ = cold('a', { a: new SkillsExecuted({}) });
      const expected = cold('a', { a: new SkillsExecutedSuccess({ skills: mockChrisFacade.data.skills }) });

      expect(effects.skills$).toBeObservable(expected);
    });
  });
});
