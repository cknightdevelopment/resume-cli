import { Type } from '@angular/core';
import { ParseStatus } from './parse-status.model';
import { CommandNames } from './command-names.model';
import { CommandComponentTypes } from './command-component-types.model';
import { CommandInputParams } from './input/command-input-params.model';

export interface ParsedCommandInput {
  status: ParseStatus;
  name?: CommandNames;
  componentType: Type<CommandComponentTypes>;
  params: CommandInputParams;
}
