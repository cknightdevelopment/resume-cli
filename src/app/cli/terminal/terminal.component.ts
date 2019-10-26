import { Component, OnInit } from '@angular/core';
import { TerminalFacade } from '../store/terminal/terminal.facade';
import { CommandFacade } from '../store/command/command.facade';
import { CommandInitiated } from '../store/command/command.actions';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  constructor(public terminalFacade: TerminalFacade, public commandFacade: CommandFacade) { }

  ngOnInit() {
  }

  initiateCommand(text: string) {
    this.commandFacade.dispatch(new CommandInitiated(text));
  }
}
