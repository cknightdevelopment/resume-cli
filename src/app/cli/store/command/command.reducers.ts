import { CommandAction, CommandActionTypes } from './command.actions';
import { RandomCommandExecutedModel } from 'src/app/models/command/executed/random-command-executed.model';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';
import { ciEquals } from 'src/app/util';
import { SkillsExecutedModel } from 'src/app/models/command/executed/skills-executed.model';
import { LinksExecutedModel } from 'src/app/models/command/executed/links-executed.model';
import { WorkHistoryExecutedModel } from 'src/app/models/command/executed/work-history-executed.model';
import { ContactExecutedModel } from 'src/app/models/command/executed/contact-executed.model';
import { IssueExecutedModel } from 'src/app/models/command/executed/issue-executed.model';
import { HelpExecutedModel } from 'src/app/models/command/executed/help-executed.model';

export interface CommandState {
  initializedCommand: InitializedCommand;
  history: InitializedCommand[];
  usedFacts: string[];
  executed: {
    random?: RandomCommandExecutedModel,
    education?: EducationExecutedModel,
    skills?: SkillsExecutedModel,
    links?: LinksExecutedModel,
    workHistory?: WorkHistoryExecutedModel,
    contact?: ContactExecutedModel,
    issue?: IssueExecutedModel,
    help?: HelpExecutedModel
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
        const sortedHistory = state.history.slice().sort((a, b) => {
          return b.initializedOn > a.initializedOn ? 1 : -1;
        });
        const isImmediateRepeat = ciEquals(sortedHistory[0].text, newCommand.text);

        if (isImmediateRepeat) {
          newCommandForHistory = [];
        }
      }

      return {
        ...state,
        initializedCommand: newCommand,
        history: [...(state.history || []), ...newCommandForHistory]
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
    case CommandActionTypes.SkillsExecuted:
      return {
        ...state,
        executed: {
          skills: null
        }
      };
    case CommandActionTypes.SkillsExecutedSuccess:
      return {
        ...state,
        executed: {
          skills: action.payload
        }
      };
    case CommandActionTypes.LinksExecuted:
      return {
        ...state,
        executed: {
          links: null
        }
      };
    case CommandActionTypes.LinksExecutedSuccess:
      return {
        ...state,
        executed: {
          links: action.payload
        }
      };
    case CommandActionTypes.WorkHistoryExecuted:
      return {
        ...state,
        executed: {
          workHistory: null
        }
      };
    case CommandActionTypes.WorkHistoryExecutedSuccess:
      return {
        ...state,
        executed: {
          workHistory: action.payload
        }
      };
    case CommandActionTypes.IssueExecuted:
      return {
        ...state,
        executed: {
          issue: null
        }
      };
    case CommandActionTypes.IssueExecutedSuccess:
      return {
        ...state,
        executed: {
          issue: action.payload
        }
      };
    case CommandActionTypes.ContactExecuted:
      return {
        ...state,
        executed: {
          contact: null
        }
      };
    case CommandActionTypes.ContactExecutedSuccess:
      return {
        ...state,
        executed: {
          contact: action.payload
        }
      };
    case CommandActionTypes.HelpExecuted:
      return {
        ...state,
        executed: {
          help: null
        }
      };
    case CommandActionTypes.HelpExecutedSuccess:
      return {
        ...state,
        executed: {
          help: action.payload
        }
      };
    default: {
      return state;
    }
  }
}
