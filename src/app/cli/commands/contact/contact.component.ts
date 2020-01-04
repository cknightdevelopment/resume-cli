import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommandComponent } from '../command.component';
import { ContactInputParams } from 'src/app/models/command/input/contact-input-params.model';
import { ContactExecutedModel } from 'src/app/models/command/executed/contact-executed.model';
import { CommandFacade } from '../../store/command/command.facade';
import { ContactExecuted } from '../../store/command/command.actions';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements CommandComponent<ContactInputParams>, OnInit {
  @Input() params: ContactInputParams;
  data: ContactExecutedModel;

  constructor(private facade: CommandFacade) { }

  ngOnInit(): void {
    this.facade.dispatch(new ContactExecuted(this.params));
    this.facade.commandData.contact$.pipe(
      filter(x => !!x),
      take(1)
    ).subscribe(x => this.data = x);
  }
}
