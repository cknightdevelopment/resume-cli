import * as factory from 'src/test-helpers/factory/state';
import { merge as _merge } from 'lodash';
import { AppState } from 'src/app/reducers';

export function appState(override?: Partial<AppState>): AppState {
  return _merge({
    cli: factory.cliState()
  } as AppState, override);
}
