import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { TerminalFacade } from '../store/terminal/terminal.facade';
import { CommandFacade } from '../store/command/command.facade';
import { CommandInitiated } from '../store/command/command.actions';
import { takeUntil, filter, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { InitializedCommand } from '../store/command/command.reducers';
import { UnsubscribeOnDestroy } from 'src/app/unsubscribe-on-destroy';
import { Observable } from 'rxjs';
import { CommandParserService } from 'src/app/core/command/command-parser/command-parser.service';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { ParseStatus } from 'src/app/models/command/parse-status.model';
import { CONSTANTS } from 'src/app/models/constants';
import { CommandNames } from 'src/app/models/command/command-names.model';
import { createCommandText } from 'src/app/command-text.util';
import { InitHelpTypes } from 'src/app/models/resume/resume-data.model';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('resumeTerminal', { static: false }) private terminalElement: ElementRef;
  commands: TerminalCommandOutputParam[] = [];
  history$: Observable<InitializedCommand[]>;

  constructor(public terminalFacade: TerminalFacade, public commandFacade: CommandFacade, public commandParserSvc: CommandParserService) {
    super();
  }

  ngOnInit() {
    this.commandFacade.initializedCommand$.pipe(
      filter(initializedCommand => !!initializedCommand),
      map(initializedCommand => ({
        initialized: initializedCommand,
        parsed: this.commandParserSvc.parseCommand(initializedCommand.text)
      } as TerminalCommandOutputParam)),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data.parsed && data.parsed.status === ParseStatus.Clear) {
        this.clear();
      } else {
        this.commands.push(data);
      }

      this.scrollToBottomOfTerminal();
    });

    this.history$ = this.commandFacade.history$.pipe(
      distinctUntilChanged((x, y) => x.length === y.length)
    );

    if (CONSTANTS.CLI_OPTIONS.INIT_HELP) {
      this.initiateCommand(createCommandText(CommandNames.Help));
      localStorage.setItem(CONSTANTS.STORAGE_KEYS.HELP_INIT(), JSON.stringify(true));
    }
  }

  initiateCommand(text: string) {
    this.commandFacade.dispatch(new CommandInitiated(text));
  }

  clear() {
    this.commands = [];
  }

  private scrollToBottomOfTerminal() {
    setTimeout(() => {
      // need to do it this way to support Edge & IE
      this.terminalElement.nativeElement.scrollTop = this.terminalElement.nativeElement.scrollHeight;
    }, 0);
  }
}

export interface TerminalCommandOutputParam {
  initialized: InitializedCommand;
  parsed?: ParsedCommandInput;
}
