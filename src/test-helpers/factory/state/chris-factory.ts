import { merge as _merge } from 'lodash';
import { ChrisState } from 'src/app/store/chris/chris.reducers';

export function chrisState(override?: Partial<ChrisState>): ChrisState {
  return _merge({
    facts: []
  } as ChrisState, override);
}
