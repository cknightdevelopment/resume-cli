import { TerminalState } from 'src/app/cli/store/terminal/terminal.reducers';
import { merge as _merge } from 'lodash';

export function terminalState(override?: Partial<TerminalState>): TerminalState {
  return _merge({
    settings: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '15px'
    }
  } as TerminalState, override);
}
