import * as factory from 'src/test-helpers/factory/state';
import { reducer, intitalState, InitializedCommand } from './command.reducers';
import { NoopAction } from 'src/test-helpers/noop-action';
// tslint:disable-next-line: max-line-length
import { CommandInitiated, RandomExecuted, RandomExecutedSuccess, EducationExecuted, EducationExecutedSuccess, CommandEffectsInit, SkillsExecuted, SkillsExecutedSuccess } from './command.actions';
import { CommandState } from './command.reducers';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { educationModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

describe('NGRX Reducers: Command', () => {
  let commandState: CommandState;
  const baseDate = new Date(2019, 0, 1);

  beforeEach(() => {
    commandState = factory.commandState();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, new NoopAction() as any)).toEqual(intitalState);
  });

  describe('effects init', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(baseDate);
    });

    it('should set history', () => {
      const history = [
        { text: '1', initializedOn: new Date() },
        { text: '2', initializedOn: new Date() }
      ] as InitializedCommand[];

      expect(reducer(commandState, new CommandEffectsInit(history)).history).toEqual(history);
    });
  });

  describe('command initiated', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(baseDate);
    });

    it('should update command state when command is initialized', () => {
      jasmine.clock().mockDate(baseDate);

      const command = {
        text: 'chris test',
        initializedOn: new Date()
      } as InitializedCommand;

      expect(reducer(commandState, new CommandInitiated('chris test'))).toEqual({
        ...commandState,
        initializedCommand: command,
        history: [command]
      } as CommandState);
    });

    it('should add to history array when command is initiated', () => {
      const prevHistory = [{ text: '1', initializedOn: new Date() }];
      commandState.history = prevHistory;

      const command = {
        text: '2',
        initializedOn: new Date()
      } as InitializedCommand;

      expect(reducer(commandState, new CommandInitiated('2')).history).toEqual([...prevHistory, command]);
    });

    it('should not add to history array when command text is empty', () => {
      const prevHistory = [{ text: '1', initializedOn: new Date() }];
      commandState.history = prevHistory;

      expect(reducer(commandState, new CommandInitiated('')).history).toEqual(prevHistory);
    });

    it('should add to history array when command text is a non-immediate duplicate', () => {
      const prevHistory = [{ text: '1', initializedOn: new Date() }, { text: '2', initializedOn: new Date() }];
      commandState.history = prevHistory;

      const command = {
        text: '1',
        initializedOn: new Date()
      } as InitializedCommand;

      expect(reducer(commandState, new CommandInitiated('1')).history).toEqual([...prevHistory, command]);
    });

    it('should not add to history array when command text is an immediate duplicate regardless of array index order ' +
      '(should sort by initializedOn DESC)',
      () => {
        const prevHistory = [{ text: 'Jan2', initializedOn: new Date(2019, 0, 2) }, { text: 'Jan1', initializedOn: new Date(2019, 0, 1) }];
        commandState.history = prevHistory;

        expect(reducer(commandState, new CommandInitiated('Jan2')).history).toEqual(prevHistory);
      });

    it('should handle when history is falsy', () => {
      commandState.history = null;

      const command = {
        text: '1',
        initializedOn: new Date()
      } as InitializedCommand;

      expect(reducer(commandState, new CommandInitiated('1')).history).toEqual([command]);
    });
  });

  describe('random', () => {
    it('should clear executed random state when random is executed', () => {
      commandState.executed = { random: { facts: ['Fact1'] } };
      expect(reducer(commandState, new RandomExecuted({ count: 3 })).executed.random).toBeNull();
    });

    it('should set executed random and used facts on successful random execution', () => {
      const payload = { facts: ['a'] } as RandomCommandExecutedModel;
      const returnedState = reducer(commandState, new RandomExecutedSuccess(payload));

      expect(returnedState.usedFacts).toEqual(['a']);
      expect(returnedState.executed.random).toEqual(payload);
    });

    it('should append used facts on successful random execution when payload does not include used facts', () => {
      commandState.usedFacts = ['c', 'd'];
      const payload = { facts: ['a', 'b'] } as RandomCommandExecutedModel;
      const returnedState = reducer(commandState, new RandomExecutedSuccess(payload));

      expect(returnedState.usedFacts).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should set used facts to payload facts on successful random execution when payload includes used facts', () => {
      commandState.usedFacts = ['a', 'c', 'd'];
      const payload = { facts: ['a', 'b'] } as RandomCommandExecutedModel;
      const returnedState = reducer(commandState, new RandomExecutedSuccess(payload));

      expect(returnedState.usedFacts).toEqual(['a', 'b']);
    });
  });

  describe('education', () => {
    it('should clear executed education state when education is executed', () => {
      commandState.executed = { education: educationModel() };
      expect(reducer(commandState, new EducationExecuted({})).executed.education).toBeNull();
    });

    it('should set executed education on successful education execution', () => {
      const payload = educationModel();
      const returnedState = reducer(commandState, new EducationExecutedSuccess(payload));

      expect(returnedState.executed.education).toEqual(payload);
    });
  });

  describe('skills', () => {
    it('should clear executed skills state when skills is executed', () => {
      commandState.executed = { skills: { skills: [skillSetModel()] } };
      expect(reducer(commandState, new SkillsExecuted({})).executed.skills).toBeNull();
    });

    it('should set executed skills on successful skills execution', () => {
      const skillSets = [skillSetModel()];
      const returnedState = reducer(commandState, new SkillsExecutedSuccess({ skills: skillSets }));

      expect(returnedState.executed.skills).toEqual({ skills: skillSets });
    });
  });
});
