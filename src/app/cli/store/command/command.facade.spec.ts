import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/store';
import { TestBed } from '@angular/core/testing';
import { CommandFacade } from './command.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommandInitiated } from './command.actions';
import { Store } from '@ngrx/store';

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
});
