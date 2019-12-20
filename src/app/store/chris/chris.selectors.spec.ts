import * as factory from 'src/test-helpers/factory/state';
import * as selectors from './chris.selectors';
import { AppState } from 'src/app/store';
import { educationModel } from 'src/test-helpers/factory/models';

describe('NGRX Selectors: Chris', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = factory.appState();
  });

  it('should select facts', () => {
    appState.chris.facts = ['test fact'];
    expect(selectors.selectFacts(appState)).toEqual(appState.chris.facts);
  });

  it('should select education', () => {
    appState.chris.education = educationModel();
    expect(selectors.selectEducation(appState)).toEqual(appState.chris.education);
  });
});
