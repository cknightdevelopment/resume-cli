import * as factory from 'src/test-helpers/factory/state';
import * as selectors from 'src/app/cli/store/terminal/terminal.selectors';
import { AppState } from 'src/app/reducers';

describe('NGRX Selectors: Terminal', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = factory.appState();
  });

  it('should select cli state', () => {
    expect(selectors.selectCli(appState)).toEqual(appState.cli);
  });

  it('should select terminal state', () => {
    expect(selectors.selectTerminal(appState)).toEqual(appState.cli.terminal);
  });

  it('should select terminal settings state', () => {
    expect(selectors.selectTerminalSettings(appState)).toEqual(appState.cli.terminal.settings);
  });
});
