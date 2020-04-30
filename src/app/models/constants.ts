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
  STORAGE_KEYS: {
    HISTORY: () => `resume:${CONSTANTS.CLI_NAME}:history`
  }
};
