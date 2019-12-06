import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { RandomCommandInputParams } from 'src/app/models/command/input/random-command-input-params.model';


@Component({
  selector: 'app-random-command',
  templateUrl: './random-command.component.html',
  styleUrls: ['./random-command.component.scss']
})
export class RandomCommandComponent implements CommandComponent<RandomCommandInputParams> {
  @Input() params: RandomCommandInputParams;

  constructor() {
  }
}
