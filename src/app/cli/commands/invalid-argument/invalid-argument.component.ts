import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommandComponent } from '../command.component';
import { InvalidArgumentInputParams } from 'src/app/models/command/input/invalid-argument-input-params.model';
import { CONSTANTS } from 'src/app/models/constants';

@Component({
  selector: 'app-invalid-argument',
  templateUrl: './invalid-argument.component.html',
  styleUrls: ['./invalid-argument.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InvalidArgumentComponent implements CommandComponent<InvalidArgumentInputParams> {
  @Input() params: InvalidArgumentInputParams;

  get message() {
    return `${CONSTANTS.CLI_NAME}: invalid argument of '${this.params.value || ''}' `
      + `for parameter '${this.params.paramName}': ${this.params.reason}`;
  }

  constructor() { }
}
