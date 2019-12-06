import { KeyValuePair } from 'src/app/models/key-value-pair.model';
import { CONSTANTS } from 'src/app/models/constants';

export function createCommandText(name?: string, params?: KeyValuePair<string>) {
  let commandText = `${CONSTANTS.CLI_NAME}`;

  if (name) {
    commandText += ` ${name}`;
  }

  const paramsText = createParametersText(params);
  if (paramsText) {
    commandText += ` ${paramsText}`;
  }

  return commandText;
}

export function createParametersText(params: KeyValuePair<string>): string {
  const paramsText = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      paramsText.push(createParameterText(key, params[key]));
    }
  }

  return paramsText.filter(x => !!x).join(' ');
}

export function createParameterText(key: string, value?: string): string {
  if (!key) {
    return '';
  }

  const valueText = value ? `${CONSTANTS.COMMAND.PARAM_KEY_VALUE_SEPARATOR}${value}` : '';

  return `${CONSTANTS.COMMAND.PARAM_PREFIX}${key}${valueText}`;
}
