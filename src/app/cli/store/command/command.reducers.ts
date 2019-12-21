import { CommandAction, CommandActionTypes } from './command.actions';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';
import { ciEquals } from 'src/app/util';

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
    case CommandActionTypes.CommandEffectsInit:
      return {
        ...state,
        history: action.payload
      };
    case CommandActionTypes.CommandInitiated:
      const newCommand = {
        text: action.payload,
        initializedOn: new Date()
      } as InitializedCommand;

      let newCommandForHistory = newCommand.text ? [newCommand] : [];

      if (newCommand.text && state.history && state.history.length) {
        const isImmediateRepeat = ciEquals(state.history[state.history.length - 1].text, newCommand.text);
        if (isImmediateRepeat) {
          newCommandForHistory = [];
        }
      }

      return {
        ...state,
        initializedCommand: newCommand,
        history: [...(state.history || []), ...newCommandForHistory ]
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
