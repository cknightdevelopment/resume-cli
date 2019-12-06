import { CommandNames } from '../command-names.model';

export interface UnknownParameterInputParams {
  command: CommandNames;
  paramName: string;
}
