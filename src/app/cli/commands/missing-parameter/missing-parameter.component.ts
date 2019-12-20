import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MissingParameterInputParams } from 'src/app/models/command/input/missing-parameter-input-params.model';
import { CommandComponent } from '../command.component';

@Component({
  selector: 'app-missing-parameter',
  templateUrl: './missing-parameter.component.html',
  styleUrls: ['./missing-parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MissingParameterComponent implements CommandComponent<MissingParameterInputParams> {
  @Input() params: MissingParameterInputParams;

  constructor() { }
}
