import { Injectable } from '@angular/core';
import { ParsedCommandInput, CommandNames, RandomCommandInputParams, ParseStatus } from 'src/app/models/command/command.model';
import { CONSTANTS } from 'src/app/models/constants';
import { KeyValuePair } from 'src/app/models/key-value-pair.model';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';

interface PreParsedCommand {
  name: string;
  params: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor() { }

  parseCommandInput(command: string): ParsedCommandInput {
    const preParsedCommand = this.getPreParsedCommandData(command);

    // todo: return some sort of unknown command data
    if (!preParsedCommand) {
      return null;
    }

    return this.getCommandInputData(preParsedCommand);
  }

  private getPreParsedCommandData(command: string) {
    const commandParts = command && command.trim().split(' ');

    // all commands must start with 'chris <commandName>'
    if (!commandParts || commandParts[0] !== CONSTANTS.CLI_NAME || commandParts.length < 2) {
      return null;
    }

    return { name: commandParts[1], params: commandParts.slice(2) } as PreParsedCommand;
  }

  private getCommandInputData(preParsedCommand: PreParsedCommand): ParsedCommandInput {
    const kvp = this.getCommandInputParamsKvp(preParsedCommand.params);

    switch (preParsedCommand.name) {
      case CommandNames.Random:
        return {
          status: ParseStatus.Parsed,
          name: CommandNames.Random,
          componentType: RandomCommandComponent,
          params: new RandomCommandInputParams(kvp)
        };
      default:
        return {
          status: ParseStatus.UnknownCommand
        };
    }
  }

  private getCommandInputParamsKvp(paramsData: string[]): KeyValuePair<string> {
    const kvp = {} as KeyValuePair<string>;

    (paramsData || [])
      .filter(x => x.startsWith(CONSTANTS.COMMAND.PARAM_PREFIX))
      .map(x => {
        const indexOfEquals = x.indexOf(CONSTANTS.COMMAND.PARAM_KEY_VALUE_SEPARATOR);

        const key = x.substring(CONSTANTS.COMMAND.PARAM_PREFIX.length, indexOfEquals >= 0 ? indexOfEquals : undefined);
        const value = indexOfEquals >= 0 ? x.substring(indexOfEquals + 1) : null;

        return { key, value };
      })
      .forEach(x => kvp[x.key] = x.value);

    return kvp;
  }
}
