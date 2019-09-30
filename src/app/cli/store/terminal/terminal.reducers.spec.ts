import * as factory from 'src/test-helpers/factory/state';
import { reducer, intitalState, TerminalState } from 'src/app/cli/store/terminal/terminal.reducers';
import { AppState } from 'src/app/reducers';
import { NoopAction } from 'src/test-helpers/noop-action';
import { SettingsUpdated as SettingsUpdated, TerminalAction } from './terminal.actions';

describe('NGRX Reducers: Terminal', () => {
  let terminalState: TerminalState;

  beforeEach(() => {
    terminalState = factory.terminalState();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, new NoopAction() as any)).toEqual(intitalState);
  });

  it('should only update passed in settings', () => {
    expect(reducer(terminalState, new SettingsUpdated({ color: 'turquoise'})).settings).toEqual({
      ...terminalState.settings,
      color: 'turquoise'
    });
  });
});
