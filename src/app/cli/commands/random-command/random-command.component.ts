import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { RandomCommandInputParams } from 'src/app/models/command/command.model';


@Component({
  selector: 'app-random-command',
  templateUrl: './random-command.component.html',
  styleUrls: ['./random-command.component.scss']
})
export class RandomCommandComponent implements OnInit, CommandComponent<RandomCommandInputParams> {
  @Input() params: RandomCommandInputParams;

  constructor() {
  }

  ngOnInit() {
  }
}
