import { Component, OnInit } from '@angular/core';
import { TerminalFacade } from '../store/terminal/terminal.facade';
import { SettingsUpdated } from '../store/terminal/terminal.actions';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  constructor(public terminalFacade: TerminalFacade) { }

  ngOnInit() {
  }
}
