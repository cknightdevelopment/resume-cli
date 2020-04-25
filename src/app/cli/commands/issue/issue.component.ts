import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { IssueInputParams } from 'src/app/models/command/input/issue-input-params.model';
import { IssueExecutedModel } from 'src/app/models/command/executed/issue-executed.model';
import { CommandFacade } from '../../store/command/command.facade';
import { IssueExecuted } from '../../store/command/command.actions';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueComponent implements CommandComponent<IssueInputParams>, OnInit {
  @Input() params: IssueInputParams;
  data: IssueExecutedModel;

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new IssueExecuted(this.params));
    this.facade.commandData.issue$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(data => {
      this.data = data;

      if (this.data.issue && this.data.issue.url) {
        // open new tab with url to log an issue
        window.open(`${this.data.issue.url}?title=${this.data.issue.title || ''}`, '_blank');
      }
    });
  }
}
