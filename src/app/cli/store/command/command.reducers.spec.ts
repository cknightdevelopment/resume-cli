import * as factory from 'src/test-helpers/factory/state';
import { reducer, intitalState, InitializedCommand } from './command.reducers';
import { AppState } from 'src/app/store';
import { NoopAction } from 'src/test-helpers/noop-action';
import { CommandInitiated } from './command.actions';
import { CommandState } from './command.reducers';

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
      initalizedCommand: command,
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
});
