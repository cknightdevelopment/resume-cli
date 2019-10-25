import * as factory from 'src/test-helpers/factory/state';
import { merge as _merge } from 'lodash';
import { AppState } from 'src/app/store';

export function appState(override?: Partial<AppState>): AppState {
  return _merge({
    cli: factory.cliState(),
    chris: factory.chrisState()
  } as AppState, override);
}
