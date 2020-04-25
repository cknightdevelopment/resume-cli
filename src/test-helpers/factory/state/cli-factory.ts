import { CliState } from 'src/app/cli/store';
import * as factory from 'src/test-helpers/factory/state';
import { mergeWith as _mergeWith } from 'lodash';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function cliState(override?: Partial<CliState>): CliState {
  return _mergeWith({
    terminal: factory.terminalState(),
    command: factory.commandState()
  } as CliState, override, replaceArrayCustomizer);
}
