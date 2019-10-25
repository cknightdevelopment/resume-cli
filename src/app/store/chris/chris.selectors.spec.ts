import * as factory from 'src/test-helpers/factory/state';
import * as selectors from './chris.selectors';
import { AppState } from 'src/app/store';

describe('NGRX Selectors: Chris', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = factory.appState();
  });

  it('should select facts', () => {
    appState.chris.facts = ['test fact'];
    expect(selectors.selectFacts(appState)).toEqual(appState.chris.facts);
  });
});
