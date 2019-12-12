import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { RandomCommandInputParams } from 'src/app/models/command/input/random-command-input-params.model';
import { CommandFacade } from '../../store/command/command.facade';
import { RandomExecuted } from '../../store/command/command.actions';
import { filter, take } from 'rxjs/operators';
import { RandomCommandExecuted } from 'src/app/models/command/executed/random-command-executed.model';


@Component({
  selector: 'app-random-command',
  templateUrl: './random-command.component.html',
  styleUrls: ['./random-command.component.scss']
})
export class RandomCommandComponent implements CommandComponent<RandomCommandInputParams>, OnInit {
  @Input() params: RandomCommandInputParams;
  data: RandomCommandExecuted;

  constructor(private facade: CommandFacade) {
  }

  ngOnInit(): void {
    this.facade.dispatch(new RandomExecuted(this.params));
    this.facade.commandData.random$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }
}
