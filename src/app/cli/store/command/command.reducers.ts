import { CommandAction, CommandActionTypes } from './command.actions';
import { RandomCommandExecuted } from 'src/app/models/command/executed/random-command-executed.model';

export interface CommandState {
  initializedCommand: InitializedCommand;
  history: InitializedCommand[];
  usedFacts: string[];
  executed: {
    random: RandomCommandExecuted
  };
}

export interface InitializedCommand {
  text: string;
  initializedOn: Date;
}

export const intitalState: CommandState = {
  initializedCommand: null,
  history: [],
  usedFacts: [],
  executed: null
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
    case CommandActionTypes.RandomExecuted:
      return {
        ...state,
        executed: {
          ...state.executed,
          random: null
        }
      };
    case CommandActionTypes.RandomExecutedSuccess:
      const containsUsedFacts = action.payload.facts.some(fact => state.usedFacts.includes(fact));
      return {
        ...state,
        executed: {
          random: action.payload
        },
        usedFacts: [
          ...action.payload.facts,
          ...(containsUsedFacts ? [] : state.usedFacts)
        ]
      };
    default: {
      return state;
    }
  }
}
