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
import { ciEquals, uuidv4 } from 'src/app/util';
import { InvalidParameterComponent } from 'src/app/cli/commands/invalid-parameter/invalid-parameter.component';
import { InvalidParameterInputParams } from 'src/app/models/command/input/invalid-parameter-input-params.model';
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { EducationComponent } from 'src/app/cli/commands/education/education.component';
import { SkillsComponent } from 'src/app/cli/commands/skills/skills.component';
import { keys as _keys, differenceWith as _differenceWith, mapKeys as _mapKeys } from 'lodash';
import { RandomInputParamsValidator } from 'src/app/models/command/input/validators/random-input-params-validator.model';
import { InputParamsValidator } from 'src/app/models/command/input/validators/input-params-validator.model';
import { LinksComponent } from 'src/app/cli/commands/links/links.component';
import { WorkHistoryComponent } from 'src/app/cli/commands/work-history/work-history.component';
import { ContactComponent } from 'src/app/cli/commands/contact/contact.component';
import { IssueComponent } from 'src/app/cli/commands/issue/issue.component';
import { IssueInputParamsValidator } from 'src/app/models/command/input/validators/issue-input-params-validator.model';


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
      return this.parseCommandInput(this.buildCommandInput({}), CommandNames.Help, HelpComponent);
    }

    return this.getCommandInputData(preParsedCommand);
  }

  public getPreParsedCommandData(command: string): PreParsedCommand {
    const commandParts = command && command.trim().split(' ').filter(x => !!x);

    // if no command besides whitespace
    if (!commandParts || !commandParts.length) {
      return { empty: true };
    } else if (!ciEquals(commandParts[0], CONSTANTS.CLI_OPTIONS.NAME)) {
      return CONSTANTS.COMMAND_SYNTAX.CLEAR_COMMANDS.some(x => ciEquals(commandParts[0], x))
        ? { clear: true } as PreParsedCommand
        : { unknownCli: true, unknownCliName: commandParts[0] } as PreParsedCommand;
    } else if (commandParts.length < 2) {
      return { noCommand: true } as PreParsedCommand;
    }

    let paramParts = commandParts.slice(2);
    paramParts = this.handleParamsWithQuotes(paramParts);

    return {
      name: commandParts[1],
      params: paramParts
    } as PreParsedCommand;
  }

  public getCommandInputData(preParsedCommand: ValidPreParsedCommand): ParsedCommandInput {
    const inputParams = this.getCommandInputParams(preParsedCommand.params);
    let parseFunc: () => ParsedCommandInput;
    const unknownCommandResult = {
      status: ParseStatus.UnknownCommand,
      componentType: UnknownCommandComponent,
      params: { commandText: preParsedCommand.name || '' }
    } as ParsedCommandInput;
    const lowercaseCommandName = preParsedCommand.name && preParsedCommand.name.toLowerCase();

    if (!CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS[lowercaseCommandName]) {
      return unknownCommandResult;
    }

    switch (lowercaseCommandName) {
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
      case CommandNames.Links:
        parseFunc = () => this.parseCommandInput(this.buildCommandInput(inputParams.valid), CommandNames.Links, LinksComponent);
        break;
      case CommandNames.WorkHistory:
        parseFunc = () => this.parseCommandInput(this.buildCommandInput(inputParams.valid), CommandNames.WorkHistory, WorkHistoryComponent);
        break;
      case CommandNames.Contact:
        parseFunc = () => this.parseCommandInput(this.buildCommandInput(inputParams.valid), CommandNames.Contact, ContactComponent);
        break;
      case CommandNames.Issue:
        parseFunc = () => this.parseCommandInput(
          this.buildCommandInput(inputParams.valid, new IssueInputParamsValidator()), CommandNames.Issue, IssueComponent
        );
        break;
      case CommandNames.Help:
        parseFunc = () => this.parseCommandInput(this.buildCommandInput(inputParams.valid), CommandNames.Help, HelpComponent);
        break;
      default:
        // active command check should already take care of this, but just in case
        return unknownCommandResult;
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
        if (param && param.startsWith(CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX)) {
          const indexOfEquals = param.indexOf(CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR);
          const key = param.substring(CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX.length, indexOfEquals >= 0 ? indexOfEquals : undefined);
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

    const unknownParameters = _differenceWith(_keys(kvp), _keys(inputParamsValidator), (a, b) => ciEquals(a, b));
    if (unknownParameters.length) {
      return { unknown: unknownParameters[0] };
    }

    const lowerCasePropertyKvp = _mapKeys(kvp, (value, key) => key.toLowerCase());

    for (const key in inputParamsValidator) {
      if (inputParamsValidator.hasOwnProperty(key)) {
        const validator = inputParamsValidator[key];
        const value = lowerCasePropertyKvp[key.toLowerCase()];
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

  private handleParamsWithQuotes(paramParts: string[]): string[] {
    const quotedModel = this.buildQuotedModel(paramParts);

    // if not valid then pass back original, and downsteam validation will handle it
    if (!this.validateQuotedModel(quotedModel)) {
      return paramParts;
    }

    return this.mergeQuotedParamParts(paramParts, quotedModel);
  }

  private getFirstNonEscapedDoubleQuoteIndex(val: string): number {
    return val.split('').findIndex((char, i) => {
      return char === CONSTANTS.COMMAND_SYNTAX.PARAM_VALUE_SPACE_SURROUNDER && val[i - 1] !== '\\';
    });
  }

  private buildQuotedModel(paramParts: string[]): QuotedModel {
    const result = {
      isOpen: false,
      groups: []
    } as QuotedModel;

    paramParts.forEach((part, partIndex) => {
      let startIndex = 0;

      while (true) {
        const quoteIndex = this.getFirstNonEscapedDoubleQuoteIndex(part.substring(startIndex));

        if (quoteIndex < 0) break;

        if (!result.isOpen) {
          result.groups.push({
            startCharIndex: quoteIndex + startIndex,
            startPartIndex: partIndex
          });
        } else {
          result.groups[result.groups.length - 1].endCharIndex = quoteIndex + startIndex;
          result.groups[result.groups.length - 1].endPartIndex = partIndex;
        }
        result.isOpen = !result.isOpen;

        startIndex += (quoteIndex + 1);
      }
    });

    return result;
  }

  private validateQuotedModel(model: QuotedModel): boolean {
    return !model.isOpen && !model.groups.some(x => x.endPartIndex == null);
  }

  private mergeQuotedParamParts(paramParts: string[], quotedModel: QuotedModel): string[] {
    const result = [] as string[];
    const uuid = uuidv4();

    for (let partIndex = 0; partIndex < paramParts.length; partIndex++) {
      const part = paramParts[partIndex];
      const group = quotedModel.groups.find(x => partIndex >= x.startPartIndex && partIndex <= x.endPartIndex);
      if (group && group.startPartIndex === partIndex) {
        const slice = paramParts.slice(group.startPartIndex, group.endPartIndex + 1);
        let mergedString = slice.join(' ');

        if (!mergedString.startsWith(CONSTANTS.COMMAND_SYNTAX.PARAM_PREFIX)) {
          return paramParts;
        }

        mergedString = mergedString
          // remove leading quote after equal sign
          // tslint:disable-next-line: max-line-length
          .replace(`${CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR}${CONSTANTS.COMMAND_SYNTAX.PARAM_VALUE_SPACE_SURROUNDER}`, CONSTANTS.COMMAND_SYNTAX.PARAM_KEY_VALUE_SEPARATOR)
          // substring to not include the trailing quote
          .substring(0, mergedString.length - 2);

        if (this.getFirstNonEscapedDoubleQuoteIndex(mergedString) >= 0) {
          return paramParts;
        }

        result.push(mergedString
          // replace any escaped quotes with simple quotes
          .replace(new RegExp(/\\/, 'g'), uuid)
          .replace(
            // tslint:disable-next-line: max-line-length
            new RegExp(`${uuid}${CONSTANTS.COMMAND_SYNTAX.PARAM_VALUE_SPACE_SURROUNDER}`, 'g'), CONSTANTS.COMMAND_SYNTAX.PARAM_VALUE_SPACE_SURROUNDER
          )
          .replace(new RegExp(uuid, 'g'), '\\')
          // .replace(/\\"/g, '"')
        );
      } else if (!group) {
        result.push(part);
      }
    }

    return result;
  }
}

interface ParsedParams<T> {
  unknown?: string;
  invalid?: InvalidArgumentInputParams;
  missing?: MissingParameterInputParams;
  params?: T;
}

interface QuotedModel {
  isOpen: boolean;
  groups: { startCharIndex: number, startPartIndex: number, endCharIndex?: number, endPartIndex?: number }[];
}
