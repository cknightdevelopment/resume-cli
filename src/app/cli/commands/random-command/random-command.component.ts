import { Component, OnInit, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { ChrisFacade } from 'src/app/store/chris/chris.facade';
import { take } from 'rxjs/operators';

interface RandomCommandData {
  count: number;
}

@Component({
  selector: 'app-random-command',
  templateUrl: './random-command.component.html',
  styleUrls: ['./random-command.component.scss']
})
export class RandomCommandComponent implements OnInit, CommandComponent<RandomCommandData> {
  @Input() data: RandomCommandData;
  facts: string[];

  constructor(private chris: ChrisFacade) {
  }

  ngOnInit() {
    this.chris.facts$.pipe(
      take(1),
    ).subscribe(facts => {
      const g: string[] = [];

      for (let i = 0; i < this.data.count; i++) {
        if (!facts.length) {
          break;
        }

        const blah = Math.floor(Math.random() * facts.length);
        g.push(facts[blah]);
      }

      this.facts = g;
    });
  }
}
