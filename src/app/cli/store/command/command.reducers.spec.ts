import * as factory from 'src/test-helpers/factory/state';
import { reducer, intitalState } from './command.reducers';
import { AppState } from 'src/app/store';
import { NoopAction } from 'src/test-helpers/noop-action';
import { CommandInitiated } from './command.actions';
import { CommandState } from './command.reducers';

describe('NGRX Reducers: Command', () => {
  let commandState: CommandState;

  beforeEach(() => {
    commandState = factory.commandState();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, new NoopAction() as any)).toEqual(intitalState);
  });

  it('should only update passed in settings', () => {
    expect(reducer(commandState, new CommandInitiated('chris test'))).toEqual({
      ...commandState,
      initalizedCommand: {
        text: 'chris test'
      }
    } as CommandState);
  });
});
