import { HelpModel, IssueModel, InitHelpTypes } from './resume/resume-data.model';

export const CONSTANTS = {
  KEY_CODES: {
    TAB: 'Tab',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
  },
  CLI_OPTIONS: {
    NAME: 'resume',
    INIT_HELP: true,
  },
  COMMAND: {
    PARAM_PREFIX: '--',
    PARAM_KEY_VALUE_SEPARATOR: '=',
    PARAM_VALUE_SPACE_SURROUNDER: '"',
    CLEAR_COMMANDS: ['clear', 'cls']
  },
  PARAM_REASONS: {
    NOT_NON_NEGATIVE_INTEGER: 'not a non-negative integer',
    NOT_NON_ZERO_POSITIVE_INTEGER: 'not an integer greater than zero'
  },
  QUERY_STRING_PARAMS: {
    RESUME_DATA_URL: 'resumeDataUrl'
  },
  STORAGE_KEYS: {
    HISTORY: () => `resume:${CONSTANTS.CLI_OPTIONS.NAME}:history`,
    HELP_INIT: () => `resume:${CONSTANTS.CLI_OPTIONS.NAME}:help-init`,
  },
  ISSUE: {
    url: 'https://github.com/cknightdevelopment/resume/issues/new'
  } as IssueModel,
  HELP: {
    sourceCodeUrl: 'https://github.com/cknightdevelopment/resume',
    buildStatus: {
      linkUrl: 'https://travis-ci.org/cknightdevelopment/resume',
      imgUrl: 'https://travis-ci.org/cknightdevelopment/resume.svg?branch=master'
    },
    coverageStatus: {
      linkUrl: 'https://coveralls.io/github/cknightdevelopment/resume?branch=master',
      imgUrl: 'https://coveralls.io/repos/github/cknightdevelopment/resume/badge.svg?branch=master'
    },
    commands: [
      {
        name: 'random',
        description: 'Learn some random facts about me',
        arguments: [
          {
            name: 'count',
            description: 'Number of random facts you want to view',
            required: false,
            default: '1'
          }
        ]
      },
      {
        name: 'contact',
        description: 'Find ways to contact me'
      },
      {
        name: 'education',
        description: 'Learn about my education'
      },
      {
        name: 'help',
        description: 'View documentation for using this Resume CLI'
      },
      {
        name: 'issue',
        description: 'Log a GitHub issue for the Resume CLI',
        arguments: [
          {
            name: 'title',
            description: 'Title of the issue',
            required: false
          }
        ]
      },
      {
        name: 'links',
        description: 'View links to some of my external profiles & resources'
      },
      {
        name: 'skills',
        description: 'View my skill levels across a number of languages, frameworks, etc.'
      },
      {
        name: 'workhistory',
        description: 'View my work history'
      }
    ]
  } as HelpModel
};
