import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/store';
import { TestBed } from '@angular/core/testing';
import { CommandFacade } from './command.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommandInitiated } from './command.actions';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { InitializedCommand } from './command.reducers';

describe('NGRX Facade: Command', () => {
  let appState: AppState;
  let facade: CommandFacade;
  let mockStore: MockStore<AppState>;

  beforeEach(() => {
    appState = factory.appState();

    TestBed.configureTestingModule({
      providers: [
        CommandFacade,
        provideMockStore({ initialState: appState })
      ]
    });

    mockStore = TestBed.get(Store);
    facade = TestBed.get(CommandFacade);
  });

  it('should dispatch actions', () => {
    spyOn(mockStore, 'dispatch');
    const action = new CommandInitiated('chris test');
    facade.dispatch(action);
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should get initialized command', () => {
    const initalizedCommand =  { text: 'test', initializedOn: new Date() } as InitializedCommand;
    mockStore.setState(factory.appState({
      cli: factory.cliState({
        command: factory.commandState({ initializedCommand: initalizedCommand })
      })
    }));

    const expected = cold('a', { a: initalizedCommand });
    expect(facade.initializedCommand$).toBeObservable(expected);
  });

  it('should get history sorted by initiated on descending', () => {
    const history = [
      { text: '2', initializedOn: new Date(2019, 0, 2) },
      { text: '1', initializedOn: new Date(2019, 0, 1) },
      { text: '3', initializedOn: new Date(2019, 0, 3) }
    ];
    mockStore.setState(factory.appState({
      cli: factory.cliState({
        command: factory.commandState({ history })
      })
    }));

    const expected = cold('a', { a: [history[2], history[0], history[1]] });
    expect(facade.history$).toBeObservable(expected);
  });
});
