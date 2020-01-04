import * as factory from 'src/test-helpers/factory/state';
import * as selectors from './chris.selectors';
import { AppState } from 'src/app/store';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

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

  it('should select skills', () => {
    appState.chris.skills = [skillSetModel()];
    expect(selectors.selectSkills(appState)).toEqual(appState.chris.skills);
  });

  it('should select links', () => {
    appState.chris.links = [linkModel()];
    expect(selectors.selectLinks(appState)).toEqual(appState.chris.links);
  });

  it('should select work history', () => {
    appState.chris.workHistory = [workHistoryModel()];
    expect(selectors.selectWorkHistory(appState)).toEqual(appState.chris.workHistory);
  });

  it('should select contact', () => {
    appState.chris.contact = contactModel();
    expect(selectors.selectContact(appState)).toEqual(appState.chris.contact);
  });

  it('should select issue', () => {
    appState.chris.issue = issueModel();
    expect(selectors.selectIssue(appState)).toEqual(appState.chris.issue);
  });
});
