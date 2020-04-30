import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommandComponent } from '../command.component';
import { EducationInputParams } from 'src/app/models/command/input/education-input-params.model';
import { CommandFacade } from '../../store/command/command.facade';
import { EducationExecuted } from '../../store/command/command.actions';
import { filter, take } from 'rxjs/operators';
import { EducationExecutedModel } from 'src/app/models/command/executed/education-executed.model';
import { CollegeModel } from 'src/app/models/resume/resume-data.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EducationComponent implements CommandComponent<EducationInputParams>, OnInit {
  @Input() params: EducationInputParams;
  data: EducationExecutedModel;

  get college(): CollegeModel {
    return this.data && this.data.college;
  }

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new EducationExecuted(this.params));
    this.facade.commandData.education$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }
}
