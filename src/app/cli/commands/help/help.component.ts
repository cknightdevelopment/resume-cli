import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommandComponent } from '../command.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements CommandComponent<HelpCommandInputParams> {
  @Input() params: HelpCommandInputParams;

  constructor() { }
}
