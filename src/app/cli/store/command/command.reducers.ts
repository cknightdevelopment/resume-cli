import { CommandAction, CommandActionTypes } from './command.actions';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';

export interface CommandState {
  initializedCommand: InitializedCommand;
  history: InitializedCommand[];
  usedFacts: string[];
  executed: {
    random?: RandomCommandExecutedModel,
    education?: EducationExecutedModel
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

      const newCommandHistory = command.text ? [command] : [];

      return {
        ...state,
        initializedCommand: command,
        history: [...(state.history || []), ...newCommandHistory ]
      };
    case CommandActionTypes.RandomExecuted:
      return {
        ...state,
        executed: {
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
    case CommandActionTypes.EducationExecuted:
      return {
        ...state,
        executed: {
          education: null
        }
      };
    case CommandActionTypes.EducationExecutedSuccess:
      return {
        ...state,
        executed: {
          education: action.payload
        }
      };
    default: {
      return state;
    }
  }
}
