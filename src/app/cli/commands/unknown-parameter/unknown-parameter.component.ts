import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommandComponent } from '../command.component';
import { UnknownParameterInputParams } from 'src/app/models/command/input/unknown-parameter-input-params.model';
import { CONSTANTS } from 'src/app/models/constants';

@Component({
  selector: 'app-unknown-parameter',
  templateUrl: './unknown-parameter.component.html',
  styleUrls: ['./unknown-parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UnknownParameterComponent implements CommandComponent<UnknownParameterInputParams> {
  @Input() params: UnknownParameterInputParams;

  get message() {
    return `${CONSTANTS.CLI_OPTIONS.NAME}: '${this.params.paramName}' is not a parameter for ${this.params.command} command`;
  }

  constructor() { }
}
