import { KeyValuePair } from '../key-value-pair.model';
import { Type } from '@angular/core';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';

export interface ParsedCommandInput {
  status: ParseStatus;
  name?: CommandNames;
  componentType?: Type<CommandComponentTypes>;
  params?: CommandInputParams;
}

export class RandomCommandInputParams {
  count: number;

  // todo: move this somewhere besides a constructor
  constructor(kvp: KeyValuePair<string>) {
    if (kvp.count) {
      this.count = parseInt(kvp.count, 10);
    }
  }
}

export enum ParseStatus {
  Parsed,
  NoContent,
  UnknownExecutable,
  MissingCommand,
  UnknownCommand,
  MissingParameter,
  UnknownParameter,
  InvalidParameter
}

export enum CommandNames {
  Random = 'random'
}

export type CommandComponentTypes = RandomCommandComponent;

export type CommandInputParams = RandomCommandInputParams;
