import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { InitializedCommand } from '../store/command/command.reducers';

@Component({
  selector: 'app-terminal-command-output',
  templateUrl: './terminal-command-output.component.html',
  styleUrls: ['./terminal-command-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalCommandOutputComponent implements OnInit {
  @Input() command: InitializedCommand;

  constructor() { }

  ngOnInit() {
  }
}
