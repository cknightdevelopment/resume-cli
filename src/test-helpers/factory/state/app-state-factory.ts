import * as factory from 'src/test-helpers/factory/state';
import { mergeWith as _mergeWith } from 'lodash';
import { AppState } from 'src/app/store';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function appState(override?: Partial<AppState>): AppState {
  return _mergeWith({
    cli: factory.cliState(),
    chris: factory.chrisState()
  } as AppState, override, replaceArrayCustomizer);
}
