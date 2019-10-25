import { CommandState } from 'src/app/cli/store/command/command.reducers';
import { merge as _merge } from 'lodash';

export function commandState(override?: Partial<CommandState>): CommandState {
  return _merge({
    initalizedCommand: null
  } as CommandState, override);
}
