import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { HelpCommandInputParams } from 'src/app/models/command/input/help-command-input-params.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements CommandComponent<HelpCommandInputParams> {
  @Input() params: HelpCommandInputParams;

  constructor() { }
}
