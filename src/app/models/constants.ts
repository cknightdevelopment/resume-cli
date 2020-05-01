export const CONSTANTS = {
  KEY_CODES: {
    TAB: 'Tab',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
  },
  CLI_NAME: 'resume',
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
    HISTORY: () => `resume:${CONSTANTS.CLI_NAME}:history`
  },
  SOURCE_CODE_URL: 'https://github.com/cknightdevelopment/resume',
  BUILD_STATUS: {
    LINK_URL: 'https://travis-ci.org/cknightdevelopment/resume',
    IMG_URL: 'https://travis-ci.org/cknightdevelopment/resume.svg?branch=master'
  },
  COVERAGE_STATUS: {
    LINK_URL: 'https://coveralls.io/github/cknightdevelopment/resume?branch=master',
    IMG_URL: 'https://coveralls.io/repos/github/cknightdevelopment/resume/badge.svg?branch=master'
  },
};
