import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { SkillsInputParams } from 'src/app/models/command/input/skills-input-params.model';
import { SkillsExecutedModel } from 'src/app/models/command/executed/skills-executed.model';
import { CommandFacade } from '../../store/command/command.facade';
import { filter, take } from 'rxjs/operators';
import { SkillsExecuted } from '../../store/command/command.actions';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements CommandComponent<SkillsInputParams>, OnInit {
  @Input() params: SkillsInputParams;
  data: SkillsExecutedModel;

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new SkillsExecuted(this.params));
    this.facade.commandData.skills$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }

  buildRatingItemClassAppendixes(score: number, max: number): string[] {
    const result = [] as string[];
    const intScore = Math.floor(score);
    const isInteger = Number.isInteger(score);
    const emptyCount = Math.floor(max - score);

    for (let i = 0; i < intScore; i++) {
      result.push('full');
    }

    if (!isInteger) {
      result.push('half');
    }

    for (let i = 0; i < emptyCount; i++) {
      result.push('empty');
    }

    return result;
  }
}
