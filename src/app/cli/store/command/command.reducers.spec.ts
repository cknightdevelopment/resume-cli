import * as factory from 'src/test-helpers/factory/state';
import { reducer, intitalState, InitializedCommand } from './command.reducers';
import { AppState } from 'src/app/store';
import { NoopAction } from 'src/test-helpers/noop-action';
import { CommandInitiated, RandomExecuted, RandomExecutedSuccess } from './command.actions';
import { CommandState } from './command.reducers';
import { RandomCommandExecuted } from 'src/app/models/command/executed/random-command-executed.model';

describe('NGRX Reducers: Command', () => {
  let commandState: CommandState;

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

  it('should update command state when command is initialized', () => {
    const baseDate = new Date(2019, 0, 1);
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

  describe('history', () => {
    const baseDate = new Date(2019, 0, 1);

    beforeEach(() => {
      jasmine.clock().mockDate(baseDate);
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
    it('should clear executed random state when random in executed', () => {
      commandState.executed = { random: { facts: ['Fact1'] } };
      expect(reducer(commandState, new RandomExecuted({ count: 3 })).executed.random).toBeNull();
    });

    it('should set executed random and used facts on successful random execution', () => {
      const payload = { facts: ['a'] } as RandomCommandExecuted;
      const returnedState = reducer(commandState, new RandomExecutedSuccess(payload));

      expect(returnedState.usedFacts).toEqual(['a']);
      expect(returnedState.executed.random).toEqual(payload);
    });

    it('should append used facts on successful random execution when payload does not include used facts', () => {
      commandState.usedFacts = ['c', 'd'];
      const payload = { facts: ['a', 'b'] } as RandomCommandExecuted;
      const returnedState = reducer(commandState, new RandomExecutedSuccess(payload));

      expect(returnedState.usedFacts).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should set used facts to payload facts on successful random execution when payload includes used facts', () => {
      commandState.usedFacts = ['a', 'c', 'd'];
      const payload = { facts: ['a', 'b'] } as RandomCommandExecuted;
      const returnedState = reducer(commandState, new RandomExecutedSuccess(payload));

      expect(returnedState.usedFacts).toEqual(['a', 'b']);
    });
  });
});
