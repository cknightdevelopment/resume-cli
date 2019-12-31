import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { LinksInputParams } from 'src/app/models/command/input/links-input-params.model';
import { LinksExecuted } from '../../store/command/command.actions';
import { CommandFacade } from '../../store/command/command.facade';
import { filter, take } from 'rxjs/operators';
import { LinksExecutedModel } from 'src/app/models/command/executed/links-executed.model';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksComponent implements CommandComponent<LinksInputParams>, OnInit {
  @Input() params: LinksInputParams;
  data: LinksExecutedModel;

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new LinksExecuted(this.params));
    this.facade.commandData.links$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }
}
