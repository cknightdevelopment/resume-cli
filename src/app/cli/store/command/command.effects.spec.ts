import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { CommandEffects } from './command.effects';
import { RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess } from './command.actions';
import { CommandService } from 'src/app/core/command/command.service';
import * as factory from 'src/test-helpers/factory/models';
import { CommandFacade } from './command.facade';
import { ChrisFacade } from 'src/app/store/chris/chris.facade';

class MockCommandService {
  facts = ['Fact1', 'Fact2'];

  getRandomFacts(): string[] {
    return this.facts;
  }
}

class MockCommandFacade {
  usedFacts$ = of(['Fact3']);
}

class MockChrisFacade {
  data = {
    education: factory.educationModel(),
    facts: ['Fact1', 'Fact2', 'Fact3']
  };

  facts$ = of(this.data.facts);
  education$ = of(this.data.education);
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
});
