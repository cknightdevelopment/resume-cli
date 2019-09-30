import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/reducers';
import { TestBed } from '@angular/core/testing';
import { TerminalFacade } from './terminal.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SettingsUpdated } from './terminal.actions';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';

describe('NGRX Facade: Terminal', () => {
  let appState: AppState;
  let facade: TerminalFacade;
  let mockStore: MockStore<AppState>;

  beforeEach(() => {
    appState = factory.appState();

    TestBed.configureTestingModule({
      providers: [
        TerminalFacade,
        provideMockStore({ initialState: appState })
      ]
    });

    mockStore = TestBed.get(Store);
    facade = TestBed.get(TerminalFacade);
  });

  it('should dispatch actions', () => {
    spyOn(mockStore, 'dispatch');
    const action = new SettingsUpdated({ color: 'red' });
    facade.dispatch(action);
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should get terminal ng style from store', () => {
    const ngStyle = {
      'background-color': appState.cli.terminal.settings.backgroundColor,
      color: appState.cli.terminal.settings.color,
      'font-family': appState.cli.terminal.settings.fontFamily,
      'font-size': appState.cli.terminal.settings.fontSize,
      'caret-color': appState.cli.terminal.settings.color
    };
    const expected = cold('a', { a: ngStyle });

    expect(facade.ngStyles$).toBeObservable(expected);
  });
});
