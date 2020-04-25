import { TerminalState } from 'src/app/cli/store/terminal/terminal.reducers';
import { mergeWith as _mergeWith } from 'lodash';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function terminalState(override?: Partial<TerminalState>): TerminalState {
  return _mergeWith({
    settings: {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '15px'
    }
  } as TerminalState, override, replaceArrayCustomizer);
}
