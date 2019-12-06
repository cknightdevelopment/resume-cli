import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';
import { CommandParserService } from './command-parser/command-parser.service';
import { PreParsedCommand } from 'src/app/models/command/input/pre-parsed-command.model';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';

class MockCommandParserService {
  getPreParsedCommandData(): PreParsedCommand { return null; }
  getCommandInputData(): ParsedCommandInput { return null; }
}

describe('CommandService', () => {
  let commandSvc: CommandService;
  let parserSvc: MockCommandParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandService,
        { provide: CommandParserService, useClass: MockCommandParserService }
      ]
    });

    commandSvc = TestBed.get(CommandService);
    parserSvc = TestBed.get(CommandParserService);
  });

  it('should be created', () => {
    expect(commandSvc).toBeTruthy();
  });

  it('should return null when preparsed data is empty', () => {
    spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({ empty: true });
    expect(commandSvc.parseCommandInput('test')).toBeNull();
  });

  it('should return unknown cli when preparsed data is unknown cli', () => {
    spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({
      unknownCli: true,
      unknownCliName: 'test'
    });

    expect(commandSvc.parseCommandInput('test')).toEqual({
      status: ParseStatus.UnknownCli,
      componentType: UnknownCliComponent,
      params: { cliName: 'test' } as UnknownCliInputParams
    } as ParsedCommandInput);
  });

  it('should return help when preparsed data is no command', () => {
    spyOn(parserSvc, 'getPreParsedCommandData').and.returnValue({
      noCommand: true
    });

    expect(commandSvc.parseCommandInput('test')).toEqual({
      name: CommandNames.Help,
      status: ParseStatus.Parsed,
      componentType: HelpComponent,
      params: {} as HelpCommandInputParams
    } as ParsedCommandInput);
  });

  it('should return result of getCommandInputData when pre parse checks all pass', () => {
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

    expect(commandSvc.parseCommandInput('test')).toEqual(expectedResult);
  });
});
