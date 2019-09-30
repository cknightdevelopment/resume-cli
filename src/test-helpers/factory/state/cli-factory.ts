import { CliState } from 'src/app/cli/store';
import * as factory from 'src/test-helpers/factory/state';
import { merge as _merge } from 'lodash';

export function cliState(override?: Partial<CliState>): CliState {
  return _merge({
    terminal: factory.terminalState()
  }, override);
}
