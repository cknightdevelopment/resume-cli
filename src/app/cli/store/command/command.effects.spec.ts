import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { CommandEffects } from './command.effects';
import { TestModule } from 'src/test-helpers/test.modules';
import { RandomExecuted, RandomExecutedSuccess } from './command.actions';
import { CommandService } from 'src/app/core/command/command.service';
import { AppState } from 'src/app/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as factory from 'src/test-helpers/factory/state';

class MockCommandService {
  facts = ['Fact1', 'Fact2'];

  getRandomFacts(): string[] {
    return this.facts;
  }
}

let actions$: Observable<Action>;

describe('NGRX Effects: Command', () => {
  let effects: CommandEffects;
  let mockCommandSvc: MockCommandService;
  let mockStore: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: factory.appState() }),
        { provide: CommandService, useClass: MockCommandService }
      ],
    });

    effects = TestBed.get(CommandEffects);
    mockCommandSvc = TestBed.get(CommandService);
    mockStore = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('random$', () => {
    beforeEach(() => {
      mockStore.setState(factory.appState({
        chris: factory.chrisState({
          facts: ['Fact1', 'Fact2', 'Fact3']
        }),
        cli: factory.cliState({
          command: factory.commandState({
            usedFacts: ['Fact3']
          })
        })
      }));
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
});
