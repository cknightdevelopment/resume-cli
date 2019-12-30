import { Injectable, Type } from '@angular/core';
import { CONSTANTS } from 'src/app/models/constants';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';
import { UnknownCommandComponent } from 'src/app/cli/commands/unknown-command/unknown-command.component';
import { KeyValuePair } from 'src/app/models/key-value-pair.model';
import { PreParsedCommand, ValidPreParsedCommand } from 'src/app/models/command/input/pre-parsed-command.model';
import { CommandComponentTypes } from 'src/app/models/command/command-component-types.model';
import { InvalidArgumentInputParams } from 'src/app/models/command/input/invalid-argument-input-params.model';
import { MissingParameterInputParams } from 'src/app/models/command/input/missing-parameter-input-params.model';
import { InvalidArgumentComponent as InvalidArgumentComponent } from 'src/app/cli/commands/invalid-argument/invalid-argument.component';
import { MissingParameterComponent } from 'src/app/cli/commands/missing-parameter/missing-parameter.component';
import { UnknownParameterInputParams } from 'src/app/models/command/input/unknown-parameter-input-params.model';
import { UnknownParameterComponent } from 'src/app/cli/commands/unknown-parameter/unknown-parameter.component';
import { ciEquals } from 'src/app/util';
import { InvalidParameterComponent } from 'src/app/cli/commands/invalid-parameter/invalid-parameter.component';
import { InvalidParameterInputParams } from 'src/app/models/command/input/invalid-parameter-input-params.model';
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';
import { EducationComponent } from 'src/app/cli/commands/education/education.component';
import { SkillsComponent } from 'src/app/cli/commands/skills/skills.component';
import { keys as _keys, difference as _difference } from 'lodash';
import { RandomInputParamsValidator } from 'src/app/models/command/input/validators/random-input-params-validator.model';
import { InputParamsValidator } from 'src/app/models/command/input/validators/input-params-validator.model';


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
        parseFunc = () => this.parseCommandInput(
          this.buildCommandInput(inputParams.valid, new RandomInputParamsValidator()), CommandNames.Random, RandomCommandComponent
        );
        break;
      case CommandNames.Education:
        parseFunc = () => this.parseCommandInput(this.buildCommandInput(inputParams.valid), CommandNames.Education, EducationComponent);
        break;
      case CommandNames.Skills:
        parseFunc = () => this.parseCommandInput(this.buildCommandInput(inputParams.valid), CommandNames.Skills, SkillsComponent);
        break;
      default:
        return {
          status: ParseStatus.UnknownCommand,
          componentType: UnknownCommandComponent,
          params: { commandText: preParsedCommand.name || '' }
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

  private buildCommandInput<T>(kvp: KeyValuePair<string>, inputParamsValidator?: InputParamsValidator<T>): ParsedParams<T> {
    const params = {} as T;

    const unknownParameters = _difference(_keys(kvp), _keys(inputParamsValidator));
    if (unknownParameters.length) {
      return { unknown: unknownParameters[0] };
    }

    for (const key in inputParamsValidator) {
      if (inputParamsValidator.hasOwnProperty(key)) {
        const validator = inputParamsValidator[key];
        const value = kvp[key];
        const validationResult = validator(key, value && value.trim());

        if (validationResult) {
          if (validationResult.invalid) {
            return { invalid: validationResult.invalid };
          } else if (validationResult.missing) {
            return { missing: validationResult.missing };
          } else {
            params[key] = validationResult.value;
          }
        } else {
          params[key] = null;
        }
      }
    }

    return { params };
  }
}

interface ParsedParams<T> {
  unknown?: string;
  invalid?: InvalidArgumentInputParams;
  missing?: MissingParameterInputParams;
  params?: T;
}
