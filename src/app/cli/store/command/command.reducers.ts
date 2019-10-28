import { CommandAction, CommandActionTypes } from './command.actions';

export interface CommandState {
  initializedCommand: InitializedCommand;
  history: InitializedCommand[];
}

export interface InitializedCommand {
  text: string;
  initializedOn: Date;
}

export const intitalState: CommandState = {
  initializedCommand: null,
  history: []
};

export function reducer(state = intitalState, action: CommandAction): CommandState {
  switch (action.type) {
    case CommandActionTypes.CommandInitiated:
      const command = {
        text: action.payload,
        initializedOn: new Date()
      } as InitializedCommand;

      return {
        ...state,
        initializedCommand: command,
        history: [...(state.history || []), command]
      };
    default: {
      return state;
    }
  }
}
