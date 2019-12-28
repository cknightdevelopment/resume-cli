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
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';
import { EducationComponent } from 'src/app/cli/commands/education/education.component';
import { EducationInputParams } from 'src/app/models/command/input/education-input-params.model';
import { SkillsComponent } from 'src/app/cli/commands/skills/skills.component';
import { SkillsInputParams } from 'src/app/models/command/input/skills-input-params.model';


@Injectable({
  providedIn: 'root'
})
export class CommandParserService {
  public parseCommand(command: string): ParsedCommandInput {
    const preParsedCommand = this.getPreParsedCommandData(command);

    if (preParsedCommand.empty) {
      return null;
    } else if (preParsedCommand.unknownCli) {
      return {
        status: ParseStatus.UnknownCli,
        componentType: UnknownCliComponent,
        params: { cliName: preParsedCommand.unknownCliName } as UnknownCliInputParams,
      };
    } else if (preParsedCommand.clear) {
      return {
        status: ParseStatus.Clear
      };
    } else if (preParsedCommand.noCommand) {
      // return help if no command provided
      return {
        name: CommandNames.Help,
        status: ParseStatus.Parsed,
        componentType: HelpComponent,
        params: {} as HelpCommandInputParams,
      };
    }

    return this.getCommandInputData(preParsedCommand);
  }

  public getPreParsedCommandData(command: string): PreParsedCommand {
    const commandParts = command && command.trim().split(' ').filter(x => !!x);

    // if no command besides whitespace
    if (!commandParts || !commandParts.length) {
      return { empty: true };
    } else if (!ciEquals(commandParts[0], CONSTANTS.CLI_NAME)) {
      return CONSTANTS.COMMAND.CLEAR_COMMANDS.some(x => ciEquals(commandParts[0], x))
        ? { clear: true } as PreParsedCommand
        : { unknownCli: true, unknownCliName: commandParts[0] } as PreParsedCommand;
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
      case CommandNames.Education:
        parseFunc = () => this.parseCommandInput(this.parseEducation(inputParams.valid), CommandNames.Education, EducationComponent);
        break;
      case CommandNames.Skills:
        parseFunc = () => this.parseCommandInput(this.parseSkills(inputParams.valid), CommandNames.Skills, SkillsComponent);
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
    const params = {} as RandomCommandInputParams;

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
              params.count = countParseResult.value;
            }
            break;
          default:
            return { unknown: key };
        }
      }
    }

    return { params };
  }

  private parseEducation(kvp: KeyValuePair<string>): ParsedParams<EducationInputParams> {
    const params = {} as EducationInputParams;

    for (const key in kvp) {
      if (kvp.hasOwnProperty(key)) {
        switch (key.toLowerCase()) {
          default:
            return { unknown: key };
        }
      }
    }

    return { params };
  }

  private parseSkills(kvp: KeyValuePair<string>): ParsedParams<SkillsInputParams> {
    const params = {} as SkillsInputParams;

    for (const key in kvp) {
      if (kvp.hasOwnProperty(key)) {
        switch (key.toLowerCase()) {
          default:
            return { unknown: key };
        }
      }
    }

    return { params };
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