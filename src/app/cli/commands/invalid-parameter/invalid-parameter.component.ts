import { Component, OnInit, Input } from '@angular/core';
import { InvalidParameterInputParams } from 'src/app/models/command/input/invalid-parameter-input-params.model';
import { CommandComponent } from '../command.component';
import { CONSTANTS } from 'src/app/models/constants';

@Component({
  selector: 'app-invalid-parameter',
  templateUrl: './invalid-parameter.component.html',
  styleUrls: ['./invalid-parameter.component.scss']
})
export class InvalidParameterComponent implements CommandComponent<InvalidParameterInputParams> {
  @Input() params: InvalidParameterInputParams;

  get message() {
    return `${CONSTANTS.CLI_NAME}: Invalid parameter syntax: '${this.params.paramName}'`;
  }

  constructor() { }
}
