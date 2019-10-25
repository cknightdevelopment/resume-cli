import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/store';
import { NoopAction } from 'src/test-helpers/noop-action';
import { ChrisState, reducer, intitalState } from './chris.reducers';
import { LoadStaticDataSuccess } from './chris.actions';


describe('NGRX Reducers: Chris', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, new NoopAction() as any)).toEqual(intitalState);
  });

  it('should perform full data reset of static data', () => {
    const data = factory.chrisState({ facts: ['test fact'] });
    expect(reducer(intitalState, new LoadStaticDataSuccess(data))).toEqual(jasmine.objectContaining<ChrisState>({
      facts: data.facts
    }));
  });
});
