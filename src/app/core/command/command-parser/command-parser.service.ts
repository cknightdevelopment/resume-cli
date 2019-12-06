import { Injectable, Type } from '@angular/core';
import { CONSTANTS } from 'src/app/models/constants';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';
import { RandomCommandInputParams } from 'src/app/models/command/input/random-command-input-params.model';
import { UnknownCommandComponent } from 'src/app/cli/commands/unknown-command/unknown-command.component';
import { UnknownCommandInputParams } from 'src/app/models/command/input/unknown-command-input-params.model';
import { KeyValuePair } from 'src/app/models/key-value-pair.model';
import { PreParsedCommand, ValidPreParsedCommand } from 'src/app/models/command/input/pre-parsed-command.model';
import { CommandComponentTypes } from 'src/app/models/command/command-component-types.model';
import { InvalidArgumentInputParams } from 'src/app/models/command/input/invalid-argument-input-params.model';
import { MissingParameterInputParams } from 'src/app/models/command/input/missing-parameter-input-params.model';
import { InvalidArgumentComponent as InvalidArgumentComponent } from 'src/app/cli/commands/invalid-argument/invalid-argument.component';
import { MissingParameterComponent } from 'src/app/cli/commands/missing-parameter/missing-parameter.component';
import { UnknownParameterInputParams } from 'src/app/models/command/input/unknown-parameter-input-params.model';
import { UnknownParameterComponent } from 'src/app/cli/commands/unknown-parameter/unknown-parameter.component';
import { isValidNumberString, isPositiveInteger, ciEquals } from 'src/app/util';
import { InvalidParameterComponent } from 'src/app/cli/commands/invalid-parameter/invalid-parameter.component';
import { InvalidParameterInputParams } from 'src/app/models/command/input/invalid-parameter-input-params.model';


@Injectable({
  providedIn: 'root'
})
export class CommandParserService {
  public getPreParsedCommandData(command: string): PreParsedCommand {
    const commandParts = command && command.trim().split(' ').filter(x => !!x);

    // if no command besides whitespace
    if (!commandParts || !commandParts.length) {
      return { empty: true };
    } else if (!ciEquals(commandParts[0], CONSTANTS.CLI_NAME)) {
      return { unknownCli: true, unknownCliName: commandParts[0] } as PreParsedCommand;
    } else if (commandParts.length < 2) {
      return { noCommand: true } as PreParsedCommand;
    }

    return {
      name: commandParts[1],
      params: commandParts.slice(2)
    } as PreParsedCommand;
  }

  public getCommandInputData(preParsedCommand: ValidPreParsedCommand): ParsedCommandInput {
    const inputParams = this.getCommandInputParams(preParsedCommand.params);
    let parseFunc: () => ParsedCommandInput;

    switch (preParsedCommand.name) {
      case CommandNames.Random:
        parseFunc = () => this.parseCommandInput(this.parseRandom(inputParams.valid), CommandNames.Random, RandomCommandComponent);
        break;
      default:
        return {
          status: ParseStatus.UnknownCommand,
          componentType: UnknownCommandComponent,
          params: this.parseUnknownCommand(preParsedCommand.name).params
        };
    }

    // perform this check after validating command name is known, as that takes precedence
    if (inputParams.invalid && inputParams.invalid.length) {
      return {
        status: ParseStatus.InvalidParameter,
        componentType: InvalidParameterComponent,
        params: { paramName: inputParams.invalid[0] } as InvalidParameterInputParams
      };
    }

    return parseFunc();
  }

  private parseCommandInput<T>(
    parsedParams: ParsedParams<T>,
    name: CommandNames,
    compenentType: Type<CommandComponentTypes>
  ): ParsedCommandInput {
    if (parsedParams.invalid) {
      return {
        status: ParseStatus.InvalidArgument,
        params: parsedParams.invalid,
        componentType: InvalidArgumentComponent,
      };
    } else if (parsedParams.missing) {
      return {
        status: ParseStatus.MissingParameter,
        params: parsedParams.missing,
        componentType: MissingParameterComponent,
      };
    } else if (parsedParams.unknown) {
      return {
        status: ParseStatus.UnknownParameter,
        params: {
          command: name,
          paramName: parsedParams.unknown
        } as UnknownParameterInputParams,
        componentType: UnknownParameterComponent,
      };
    } else {
      return {
        status: ParseStatus.Parsed,
        name,
        componentType: compenentType,
        params: parsedParams.params
      };
    }
  }

  private getCommandInputParams(paramsData: string[]): { valid: KeyValuePair<string>, invalid: string[] } {
    const result = {
      valid: {} as KeyValuePair<string>,
      invalid: [] as string[]
    };

    (paramsData || [])
      .forEach(param => {
        if (param && param.startsWith(CONSTANTS.COMMAND.PARAM_PREFIX)) {
          const indexOfEquals = param.indexOf(CONSTANTS.COMMAND.PARAM_KEY_VALUE_SEPARATOR);
          const key = param.substring(CONSTANTS.COMMAND.PARAM_PREFIX.length, indexOfEquals >= 0 ? indexOfEquals : undefined);
          const value = indexOfEquals >= 0 ? param.substring(indexOfEquals + 1) : null;
          result.valid[key] = value;
        } else {
          result.invalid.push(param);
        }
      });

    return result;
  }

  /****
   * component specific parsers
  ****/

  private parseRandom(kvp: KeyValuePair<string>): ParsedParams<RandomCommandInputParams> {
    const result = {} as RandomCommandInputParams;

    for (const key in kvp) {
      if (kvp.hasOwnProperty(key)) {
        const value = kvp[key];

        switch (key.toLowerCase()) {
          case 'count':
            const countParseResult = isValidNumberString(value);
            if (!countParseResult.valid || !isPositiveInteger(countParseResult.value)) {
              return {
                invalid: {
                  paramName: key,
                  value,
                  reason: CONSTANTS.PARAM_REASONS.NOT_NON_NEGATIVE_INTEGER
                }
              };
            } else {
              result.count = countParseResult.value;
            }
            break;
          default:
            return { unknown: key };
        }
      }
    }

    return { params: result };
  }

  private parseUnknownCommand(commandText: string): ParsedParams<UnknownCommandInputParams> {
    return {
      params: { commandText: commandText || '' }
    };
  }
}

interface ParsedParams<T> {
  unknown?: string;
  invalid?: InvalidArgumentInputParams;
  missing?: MissingParameterInputParams;
  params?: T;
}
