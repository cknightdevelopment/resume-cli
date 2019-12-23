import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/store';
import { TestBed } from '@angular/core/testing';
import { CommandFacade } from './command.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommandInitiated } from './command.actions';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { InitializedCommand } from './command.reducers';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { educationModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

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
    const initalizedCommand = { text: 'test', initializedOn: new Date() } as InitializedCommand;
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

  it('should get used facts', () => {
    const usedFacts = ['Fact1', 'Fact2', 'Fact3'] as string[];
    mockStore.setState(factory.appState({
      cli: factory.cliState({
        command: factory.commandState({ usedFacts })
      })
    }));

    const expected = cold('a', { a: usedFacts });
    expect(facade.usedFacts$).toBeObservable(expected);
  });

  it('should get executed random data', () => {
    const facts = ['Fact1', 'Fact2'];
    mockStore.setState(factory.appState({
      cli: factory.cliState({
        command: factory.commandState({
          executed: {
            random: { facts }
          }
        })
      })
    }));

    const expected = cold('a', { a: { facts } as RandomCommandExecutedModel });
    expect(facade.commandData.random$).toBeObservable(expected);
  });

  it('should get executed education data', () => {
    const edu = educationModel();
    mockStore.setState(factory.appState({
      cli: factory.cliState({
        command: factory.commandState({
          executed: {
            education: edu
          }
        })
      })
    }));

    const expected = cold('a', { a: edu });
    expect(facade.commandData.education$).toBeObservable(expected);
  });

  it('should get executed skills data', () => {
    const skillSets = [skillSetModel()];
    mockStore.setState(factory.appState({
      cli: factory.cliState({
        command: factory.commandState({
          executed: {
            skills: { skills: skillSets }
          }
        })
      })
    }));

    const expected = cold('a', { a: { skills: skillSets } });
    expect(facade.commandData.skills$).toBeObservable(expected);
  });
});
