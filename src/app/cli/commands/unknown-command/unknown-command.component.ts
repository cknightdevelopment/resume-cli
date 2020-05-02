import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommandComponent } from '../command.component';
import { UnknownCommandInputParams } from 'src/app/models/command/input/unknown-command-input-params.model';
import { CONSTANTS } from 'src/app/models/constants';
import { CommandNames } from 'src/app/models/command/command-names.model';

@Component({
  selector: 'app-unknown-command',
  templateUrl: './unknown-command.component.html',
  styleUrls: ['./unknown-command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UnknownCommandComponent implements CommandComponent<UnknownCommandInputParams> {
  @Input() params: UnknownCommandInputParams;

  get message() {
    return `${CONSTANTS.CLI_OPTIONS.NAME}: '${this.params.commandText}' is not a ${CONSTANTS.CLI_OPTIONS.NAME} command. `
      + `See '${CONSTANTS.CLI_OPTIONS.NAME} ${CommandNames.Help}'.`;
  }

  constructor() { }
}
