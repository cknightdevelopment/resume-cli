import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { UnknownCliInputParams } from 'src/app/models/command/input/unknown-cli-input-params.model';

@Component({
  selector: 'app-unknown-cli',
  templateUrl: './unknown-cli.component.html',
  styleUrls: ['./unknown-cli.component.scss']
})
export class UnknownCliComponent implements CommandComponent<UnknownCliInputParams> {
  @Input() params: UnknownCliInputParams;

  constructor() { }
}
