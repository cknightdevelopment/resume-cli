import { TestBed } from '@angular/core/testing';

import { CommandParserService } from './command-parser.service';
import { PreParsedCommand } from 'src/app/models/command/input/pre-parsed-command.model';
import { createCommandText, createParametersText, createParameterText } from 'src/test-helpers/factory/command-text-factory';
import { UnknownCommandInputParams } from 'src/app/models/command/input/unknown-command-input-params.model';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { UnknownCommandComponent } from 'src/app/cli/commands/unknown-command/unknown-command.component';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { InvalidParameterComponent } from 'src/app/cli/commands/invalid-parameter/invalid-parameter.component';
import { InvalidParameterInputParams } from 'src/app/models/command/input/invalid-parameter-input-params.model';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';
import { RandomInputParams } from 'src/app/models/command/input/random-input-params.model';
import { InvalidArgumentComponent } from 'src/app/cli/commands/invalid-argument/invalid-argument.component';
import { InvalidArgumentInputParams } from 'src/app/models/command/input/invalid-argument-input-params.model';
import { CONSTANTS } from 'src/app/models/constants';
import { UnknownParameterComponent } from 'src/app/cli/commands/unknown-parameter/unknown-parameter.component';
import { UnknownParameterInputParams } from 'src/app/models/command/input/unknown-parameter-input-params.model';
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';
import { EducationComponent } from 'src/app/cli/commands/education/education.component';
import { EducationInputParams } from 'src/app/models/command/input/education-input-params.model';
import { SkillsComponent } from 'src/app/cli/commands/skills/skills.component';
import { SkillsInputParams } from 'src/app/models/command/input/skills-input-params.model';
import { LinksComponent } from 'src/app/cli/commands/links/links.component';
import { LinksInputParams } from 'src/app/models/command/input/links-input-params.model';
import { WorkHistoryComponent } from 'src/app/cli/commands/work-history/work-history.component';
import { WorkHistoryInputParams } from 'src/app/models/command/input/work-history-input-params.model';
import { ContactComponent } from 'src/app/cli/commands/contact/contact.component';
import { ContactInputParams } from 'src/app/models/command/input/contact-input-params.model';
import { IssueComponent } from 'src/app/cli/commands/issue/issue.component';
import { IssueInputParams } from 'src/app/models/command/input/issue-input-params.model';

describe('CommandParserService', () => {
  let parserSvc: CommandParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandParserService
      ]
    });

    parserSvc = TestBed.get(CommandParserService);
  });

  it('should be created', () => {
    expect(parserSvc).toBeTruthy();
  });

  describe('parseCommand', () => {
    it('should return null when preparsed data is empty', () => {
      spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({ empty: true });
      expect(parserSvc.parseCommand('test')).toBeNull();
    });

    it('should return unknown cli when preparsed data is unknown cli', () => {
      spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({
        unknownCli: true,
        unknownCliName: 'test'
      });

      expect(parserSvc.parseCommand('test')).toEqual({
        status: ParseStatus.UnknownCli,
        componentType: UnknownCliComponent,
        params: { cliName: 'test' } as UnknownCliInputParams
      } as ParsedCommandInput);
    });

    it('should return clear when preparsed data is clear', () => {
      spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({ clear: true });

      expect(parserSvc.parseCommand('test')).toEqual({
        status: ParseStatus.Clear
      } as ParsedCommandInput);
    });

    it('should return help when preparsed data is no command', () => {
      spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({
        noCommand: true
      });

      expect(parserSvc.parseCommand('test')).toEqual({
        name: CommandNames.Help,
        status: ParseStatus.Parsed,
        componentType: HelpComponent,
        params: {} as HelpCommandInputParams
      } as ParsedCommandInput);
    });

    it('should return result of getCommand when pre parse checks all pass', () => {
      const expectedResult = {
        componentType: RandomCommandComponent,
        name: CommandNames.Random,
        params: {},
        status: ParseStatus.Parsed
      } as ParsedCommandInput;
      spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({
        name: 'test'
      });
      spyOn(parserSvc, 'getCommandInputData').and.returnValue(expectedResult);

      expect(parserSvc.parseCommand('test')).toEqual(expectedResult);
    });
  });

  describe('getPreParsedCommandData', () => {
    it('should return as empty when falsy value or all whitespace', () => {
      const values = [null, undefined, '', ' ', '      '];
      values.forEach(x => expect(parserSvc.getPreParsedCommandData(x)).toEqual({ empty: true } as PreParsedCommand));
    });

    it('should return unknownCli when unknown cli', () => {
      const text = 'UNKNOWNCLI';
      expect(parserSvc.getPreParsedCommandData(text)).toEqual({
        unknownCli: true,
        unknownCliName: 'UNKNOWNCLI'
      } as PreParsedCommand);
    });

    it('should return noCommand when known cli but no command', () => {
      const text = createCommandText();
      expect(parserSvc.getPreParsedCommandData(text)).toEqual({ noCommand: true } as PreParsedCommand);
    });

    it('should return clear when clear command passed in (non-main cli command)', () => {
      CONSTANTS.COMMAND.CLEAR_COMMANDS.forEach(cmd => {
        expect(parserSvc.getPreParsedCommandData(cmd)).toEqual({ clear: true } as PreParsedCommand);
      });
    });

    it('should return name and empty params when command provided without parameters', () => {
      const text = createCommandText('commandname');
      expect(parserSvc.getPreParsedCommandData(text)).toEqual({ name: 'commandname', params: [] } as PreParsedCommand);
    });

    it('should return name and params array when command provided with parameters', () => {
      const text = createCommandText('commandname', { param1: 'value1', param2: 'value2' });
      expect(parserSvc.getPreParsedCommandData(text)).toEqual({
        name: 'commandname',
        params: [createParameterText('param1', 'value1'), createParameterText('param2', 'value2')]
      } as PreParsedCommand);
    });

    it('should parse cli name with case insensitivity', () => {
      const text = createCommandText('commandname').toUpperCase();
      expect(parserSvc.getPreParsedCommandData(text)).toEqual({
        name: 'COMMANDNAME',
        params: []
      } as PreParsedCommand);
    });
  });

  describe('getCommandInputData', () => {
    it('should return unknown command when provided no command name', () => {
      const result = parserSvc.getCommandInputData({});
      expect(result).toEqual({
        status: ParseStatus.UnknownCommand,
        componentType: UnknownCommandComponent,
        params: { commandText: '' } as UnknownCommandInputParams
      } as ParsedCommandInput);
    });

    it('should return unknown command when provided command name that is not known', () => {
      const result = parserSvc.getCommandInputData({ name: 'UNKNOWNCOMMAND' });
      expect(result).toEqual({
        status: ParseStatus.UnknownCommand,
        componentType: UnknownCommandComponent,
        params: { commandText: 'UNKNOWNCOMMAND' } as UnknownCommandInputParams
      } as ParsedCommandInput);
    });

    it('should return unknown command when provided command name that is not known, even when provided malformed params', () => {
      const result = parserSvc.getCommandInputData({ name: 'UNKNOWNCOMMAND', params: ['BADPARAM'] });
      expect(result).toEqual({
        status: ParseStatus.UnknownCommand,
        componentType: UnknownCommandComponent,
        params: { commandText: 'UNKNOWNCOMMAND' } as UnknownCommandInputParams
      } as ParsedCommandInput);
    });

    it('should return invalid param with first invalid param when provided malformed param', () => {
      const result = parserSvc.getCommandInputData({ name: CommandNames.Random, params: ['BADPARAM1', 'BADPARAM2'] });
      expect(result).toEqual({
        status: ParseStatus.InvalidParameter,
        componentType: InvalidParameterComponent,
        params: { paramName: 'BADPARAM1' } as InvalidParameterInputParams
      } as ParsedCommandInput);
    });

    describe('RandomCommandComponent', () => {
      it('should return random with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Random });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Random,
          componentType: RandomCommandComponent,
          params: { count: null } as RandomInputParams
        } as ParsedCommandInput);
      });

      it('should return random with valid count param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Random, params: [createParameterText('count', '3')] });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Random,
          componentType: RandomCommandComponent,
          params: { count: 3 } as RandomInputParams
        } as ParsedCommandInput);
      });

      it('should return invalid argument with negative count param argument', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Random, params: [createParameterText('count', '-3')] });
        expect(result).toEqual({
          status: ParseStatus.InvalidArgument,
          componentType: InvalidArgumentComponent,
          params: {
            paramName: 'count',
            value: '-3',
            reason: CONSTANTS.PARAM_REASONS.NOT_NON_NEGATIVE_INTEGER
          } as InvalidArgumentInputParams
        } as ParsedCommandInput);
      });

      it('should return invalid argument with non-number count param argument', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Random, params: [createParameterText('count', 'abc')] });
        expect(result).toEqual({
          status: ParseStatus.InvalidArgument,
          componentType: InvalidArgumentComponent,
          params: {
            paramName: 'count',
            value: 'abc',
            reason: CONSTANTS.PARAM_REASONS.NOT_NON_NEGATIVE_INTEGER
          } as InvalidArgumentInputParams
        } as ParsedCommandInput);
      });

      it('should return unknown parameter when unrecognized param is provided', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Random, params: [createParameterText('BADPARAM')] });
        expect(result).toEqual({
          status: ParseStatus.UnknownParameter,
          componentType: UnknownParameterComponent,
          params: {
            paramName: 'BADPARAM',
            command: CommandNames.Random
          } as UnknownParameterInputParams
        } as ParsedCommandInput);
      });
    });

    describe('EducationComponent', () => {
      it('should return education with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Education });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Education,
          componentType: EducationComponent,
          params: { } as EducationInputParams
        } as ParsedCommandInput);
      });

      it('should return unknown parameter when unrecognized param is provided', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Education, params: [createParameterText('BADPARAM')] });
        expect(result).toEqual({
          status: ParseStatus.UnknownParameter,
          componentType: UnknownParameterComponent,
          params: {
            paramName: 'BADPARAM',
            command: CommandNames.Education
          } as UnknownParameterInputParams
        } as ParsedCommandInput);
      });
    });

    describe('SkillsComponent', () => {
      it('should return skills with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Skills });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Skills,
          componentType: SkillsComponent,
          params: { } as SkillsInputParams
        } as ParsedCommandInput);
      });

      it('should return unknown parameter when unrecognized param is provided', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Skills, params: [createParameterText('BADPARAM')] });
        expect(result).toEqual({
          status: ParseStatus.UnknownParameter,
          componentType: UnknownParameterComponent,
          params: {
            paramName: 'BADPARAM',
            command: CommandNames.Skills
          } as UnknownParameterInputParams
        } as ParsedCommandInput);
      });
    });

    describe('LinksComponent', () => {
      it('should return links with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Links });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Links,
          componentType: LinksComponent,
          params: { } as LinksInputParams
        } as ParsedCommandInput);
      });
    });

    describe('WorkHistoryComponent', () => {
      it('should return work history with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.WorkHistory });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.WorkHistory,
          componentType: WorkHistoryComponent,
          params: { } as WorkHistoryInputParams
        } as ParsedCommandInput);
      });
    });

    describe('ContactComponent', () => {
      it('should return contact with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Contact });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Contact,
          componentType: ContactComponent,
          params: { } as ContactInputParams
        } as ParsedCommandInput);
      });
    });

    describe('IssueComponent', () => {
      it('should return issue with no param data', () => {
        const result = parserSvc.getCommandInputData({ name: CommandNames.Issue });
        expect(result).toEqual({
          status: ParseStatus.Parsed,
          name: CommandNames.Issue,
          componentType: IssueComponent,
          params: { } as IssueInputParams
        } as ParsedCommandInput);
      });
    });
  });
});
