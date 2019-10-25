import { CommandAction, CommandActionTypes } from './command.actions';

export interface CommandState {
  initalizedCommand: InitializedCommand;
}

export interface InitializedCommand {
  text: string;
}

export const intitalState: CommandState = {
  initalizedCommand: null
};

export function reducer(state = intitalState, action: CommandAction): CommandState {
  switch (action.type) {
    case CommandActionTypes.CommandInitiated:
    return {
      ...state,
      initalizedCommand: {
        text: action.payload
      }
    };
    default: {
      return state;
    }
  }
}
