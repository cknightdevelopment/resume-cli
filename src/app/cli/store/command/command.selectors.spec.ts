import * as factory from 'src/test-helpers/factory/state';
import * as selectors from 'src/app/cli/store/command/command.selectors';
import { AppState } from 'src/app/store';
import { InitializedCommand } from './command.reducers';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel, helpModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

describe('NGRX Selectors: Command', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = factory.appState();
  });

  it('should get initialized command', () => {
    const command = { text: 'test', initializedOn: new Date() } as InitializedCommand;
    appState.cli.command.initializedCommand = command;

    expect(selectors.selectInitializedCommand(appState)).toEqual(command);
  });

  it('should select history sorted by initiated on descending', () => {
    const history = [
      { text: '2', initializedOn: new Date(2019, 0, 2) },
      { text: '1', initializedOn: new Date(2019, 0, 1) },
      { text: '3', initializedOn: new Date(2019, 0, 3) }
    ];
    appState.cli.command.history = history;

    expect(selectors.selectHistory(appState)).toEqual([history[2], history[0], history[1]]);
  });

  it('should select used facts', () => {
    const facts = ['Fact1', 'Fact2', 'Fact3'];
    appState.cli.command.usedFacts = facts;

    expect(selectors.selectUsedFacts(appState)).toEqual(facts);
  });

  it('should select executed random data', () => {
    const facts = ['Fact1', 'Fact2', 'Fact3'];
    appState.cli.command.executed = {
      random: { facts }
    };

    expect(selectors.selectRandomExecutionData(appState)).toEqual(appState.cli.command.executed.random);
  });

  it('should select executed education data', () => {
    const edu = educationModel();
    appState.cli.command.executed = {
      education: edu
    };

    expect(selectors.selectEducationExecutionData(appState)).toEqual(appState.cli.command.executed.education);
  });

  it('should select executed skills data', () => {
    const skillSets = [skillSetModel()];
    appState.cli.command.executed = {
      skills: { skills: skillSets }
    };

    expect(selectors.selectSkillsExecutionData(appState)).toEqual(appState.cli.command.executed.skills);
  });

  it('should select executed links data', () => {
    const links = [linkModel()];
    appState.cli.command.executed = {
      links: { links }
    };

    expect(selectors.selectLinksExecutionData(appState)).toEqual(appState.cli.command.executed.links);
  });

  it('should select executed work history data', () => {
    const workHistory = [workHistoryModel()];
    appState.cli.command.executed = {
      workHistory: { workHistory }
    };

    expect(selectors.selectWorkHistoryExecutionData(appState)).toEqual(appState.cli.command.executed.workHistory);
  });

  it('should select executed contact data', () => {
    const contact = contactModel();
    appState.cli.command.executed = {
      contact: { contact }
    };

    expect(selectors.selectContactExecutionData(appState)).toEqual(appState.cli.command.executed.contact);
  });

  it('should select executed issue data', () => {
    const issue = issueModel();
    appState.cli.command.executed = {
      issue: { issue }
    };

    expect(selectors.selectIssueExecutionData(appState)).toEqual(appState.cli.command.executed.issue);
  });

  it('should select executed help data', () => {
    const help = helpModel();
    appState.cli.command.executed = {
      help: { help }
    };

    expect(selectors.selectHelpExecutionData(appState)).toEqual(appState.cli.command.executed.help);
  });
});
