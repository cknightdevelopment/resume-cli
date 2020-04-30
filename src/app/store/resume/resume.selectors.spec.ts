import * as factory from 'src/test-helpers/factory/state';
import * as selectors from './resume.selectors';
import { AppState } from 'src/app/store';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel, helpModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

describe('NGRX Selectors: Resume', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = factory.appState();
  });

  it('should select facts', () => {
    appState.resume.facts = ['test fact'];
    expect(selectors.selectFacts(appState)).toEqual(appState.resume.facts);
  });

  it('should select education', () => {
    appState.resume.education = educationModel();
    expect(selectors.selectEducation(appState)).toEqual(appState.resume.education);
  });

  it('should select skills', () => {
    appState.resume.skills = [skillSetModel()];
    expect(selectors.selectSkills(appState)).toEqual(appState.resume.skills);
  });

  it('should select links', () => {
    appState.resume.links = [linkModel()];
    expect(selectors.selectLinks(appState)).toEqual(appState.resume.links);
  });

  it('should select work history', () => {
    appState.resume.workHistory = [workHistoryModel()];
    expect(selectors.selectWorkHistory(appState)).toEqual(appState.resume.workHistory);
  });

  it('should select contact', () => {
    appState.resume.contact = contactModel();
    expect(selectors.selectContact(appState)).toEqual(appState.resume.contact);
  });

  it('should select issue', () => {
    appState.resume.issue = issueModel();
    expect(selectors.selectIssue(appState)).toEqual(appState.resume.issue);
  });

  it('should select help', () => {
    appState.resume.help = helpModel();
    expect(selectors.selectHelp(appState)).toEqual(appState.resume.help);
  });
});
