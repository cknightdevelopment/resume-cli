import { createParameterText, createParametersText, createCommandText } from './command-text.util';
import { CONSTANTS } from './models/constants';

describe('command text util', () => {
  describe('createParameterText', () => {
    it('should return parameter with key and value', () => {
      expect(createParameterText('key', 'value'))
        .toEqual(`${CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX}key${CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR}value`);
    });

    it('should return parameter with key and no value', () => {
      expect(createParameterText('key')).toEqual(`${CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX}key`);
    });

    it('should return empty parameter when key is falsy', () => {
      expect(createParameterText('')).toEqual('');
      expect(createParameterText(null)).toEqual('');
      expect(createParameterText(null, 'value')).toEqual('');
    });
  });

  describe('createParametersText', () => {
    it('should return parmeters separated by space', () => {
      expect(createParametersText({
        key1: 'value1',
        key2: 'value2'
      })).toEqual(
        `${CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX}key1${CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR}value1 ` +
        `${CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX}key2${CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR}value2`);
    });

    it('should exclude bad formatted parameters', () => {
      expect(createParametersText({
        key1: 'value1',
        '': 'value2'
      })).toEqual(
        `${CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX}key1${CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR}value1`);
    });

    it('should return empty when no parameters provided', () => {
      expect(createParametersText({})).toEqual('');
      expect(createParametersText(null)).toEqual('');
    });
  });

  describe('createCommandText', () => {
    it('should return cli name when no command or parameters provided', () => {
      expect(createCommandText()).toEqual(CONSTANTS.CLI_OPTIONS.NAME);
    });

    it('should return cli name and command name when only command is provided', () => {
      expect(createCommandText('test')).toEqual(`${CONSTANTS.CLI_OPTIONS.NAME} test`);
    });

    it('should return full command when when command and arguments are provided', () => {
      expect(createCommandText('test', { key: 'value' })).toEqual(
        // tslint:disable-next-line: max-line-length
        `${CONSTANTS.CLI_OPTIONS.NAME} test ${CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX}key${CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR}value`
      );
    });

    it('should ignore parameters if no command is provided', () => {
      expect(createCommandText(null, { key: 'value' })).toEqual(CONSTANTS.CLI_OPTIONS.NAME);
    });
  });
});
