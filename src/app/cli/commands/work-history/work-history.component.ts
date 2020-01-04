import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { WorkHistoryInputParams } from 'src/app/models/command/input/work-history-input-params.model';
import { WorkHistoryExecutedModel } from 'src/app/models/command/executed/work-history-executed.model';
import { CommandFacade } from '../../store/command/command.facade';
import { WorkHistoryExecuted } from '../../store/command/command.actions';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkHistoryComponent implements CommandComponent<WorkHistoryInputParams>, OnInit {
  @Input() params: WorkHistoryInputParams;
  data: WorkHistoryExecutedModel;

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new WorkHistoryExecuted(this.params));
    this.facade.commandData.workHistory$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }
}
