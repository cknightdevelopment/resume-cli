import { CommandState } from 'src/app/cli/store/command/command.reducers';
import { mergeWith as _mergeWith } from 'lodash';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function commandState(override?: Partial<CommandState>): CommandState {
  return _mergeWith({
    initializedCommand: null,
    history: [],
    executed: null,
    usedFacts: []
  } as CommandState, override, replaceArrayCustomizer);
}
