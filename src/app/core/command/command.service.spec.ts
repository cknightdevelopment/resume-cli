import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';
import { CONSTANTS } from 'src/app/models/constants';
import { CommandNames, RandomCommandInputParams, ParsedCommandInput, ParseStatus } from 'src/app/models/command/command.model';
import { RandomCommandComponent } from 'src/app/cli/commands/random-command/random-command.component';
import { KeyValuePair } from 'src/app/models/key-value-pair.model';

describe('CommandService', () => {
  let commandSvc: CommandService;

  function createCommandText(name: string, params?: KeyValuePair<string>) {
    const paramsText = [];

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        paramsText.push(`${CONSTANTS.COMMAND.PARAM_PREFIX}${key}${CONSTANTS.COMMAND.PARAM_KEY_VALUE_SEPARATOR}${params[key]}`);
      }
    }

    return `${CONSTANTS.CLI_NAME} ${name} ${paramsText.join(' ')}`;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandService
      ]
    });
    commandSvc = TestBed.get(CommandService);
  });

  it('should be created', () => {
    expect(commandSvc).toBeTruthy();
  });

  describe('parsing command input', () => {
    describe('RandomCommandComponent', () => {
      it('should return parsed data for random command component with parameters', () => {
        const text = createCommandText(CommandNames.Random, { count: '123' });
        const result = commandSvc.parseCommandInput(text);

        expect(result).toEqual({
          componentType: RandomCommandComponent,
          name: CommandNames.Random,
          status: ParseStatus.Parsed,
          params: new RandomCommandInputParams({ count: '123' })
        } as ParsedCommandInput);
      });

      it('should return parsed data for random command component without parameters', () => {
        const text = createCommandText(CommandNames.Random);
        const result = commandSvc.parseCommandInput(text);

        expect(result).toEqual({
          componentType: RandomCommandComponent,
          name: CommandNames.Random,
          status: ParseStatus.Parsed,
          params: new RandomCommandInputParams({})
        } as ParsedCommandInput);
      });
    });

    it('should return null when provided value starting with cli name but no command', () => {
      const result = commandSvc.parseCommandInput(CONSTANTS.CLI_NAME);
      expect(result).toBeNull();
    });

    it('should return null when provided value not starting with cli name', () => {
      const result = commandSvc.parseCommandInput('othername random');
      expect(result).toBeNull();
    });

    it('should return null when provided a falsy value', () => {
      const result = commandSvc.parseCommandInput(null);
      expect(result).toBeNull();
    });
  });
});
