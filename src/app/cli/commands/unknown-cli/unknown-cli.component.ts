import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommandComponent } from '../command.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';

@Component({
  selector: 'app-unknown-cli',
  templateUrl: './unknown-cli.component.html',
  styleUrls: ['./unknown-cli.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UnknownCliComponent implements CommandComponent<UnknownCliInputParams> {
  @Input() params: UnknownCliInputParams;

  constructor() { }
}
