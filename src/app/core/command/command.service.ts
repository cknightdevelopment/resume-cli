import { Injectable } from '@angular/core';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { CommandParserService } from './command-parser/command-parser.service';
import { UnknownCliComponent } from 'src/app/cli/commands/unknown-cli/unknown-cli.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { HelpComponent } from 'src/app/cli/commands/help/help.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';
import { CommandNames } from 'src/app/models/command/command-names.model';

@Injectable({
  providedIn: 'root',
  deps: [
    CommandParserService
  ]
})
export class CommandService {
  constructor(private parserSvc: CommandParserService) { }

  parseCommandInput(command: string): ParsedCommandInput {
    const preParsedCommand = this.parserSvc.getPreParsedCommandData(command);

    if (preParsedCommand.empty) {
      return null;
    } else if (preParsedCommand.unknownCli) {
      return {
        status: ParseStatus.UnknownCli,
        componentType: UnknownCliComponent,
        params: { cliName: preParsedCommand.unknownCliName } as UnknownCliInputParams,
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

    return this.parserSvc.getCommandInputData(preParsedCommand);
  }
}
