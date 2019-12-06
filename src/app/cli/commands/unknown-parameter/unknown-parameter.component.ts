import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { UnknownParameterInputParams } from 'src/app/models/command/input/unknown-parameter-input-params.model';
import { UnknownCommandInputParams } from 'src/app/models/command/input/unknown-command-input-params.model';
import { CONSTANTS } from 'src/app/models/constants';

@Component({
  selector: 'app-unknown-parameter',
  templateUrl: './unknown-parameter.component.html',
  styleUrls: ['./unknown-parameter.component.scss']
})
export class UnknownParameterComponent implements CommandComponent<UnknownParameterInputParams> {
  @Input() params: UnknownParameterInputParams;

  get message() {
    return `${CONSTANTS.CLI_NAME}: '${this.params.paramName}' is not a parameter for ${this.params.command} command`;
  }

  constructor() { }
}
