import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TerminalFacade } from '../store/terminal/terminal.facade';
import { CommandFacade } from '../store/command/command.facade';
import { CommandInitiated } from '../store/command/command.actions';
import { takeUntil, filter, distinctUntilChanged, tap } from 'rxjs/operators';
import { InitializedCommand } from '../store/command/command.reducers';
import { UnsubscribeOnDestroy } from 'src/app/unsubscribe-on-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent extends UnsubscribeOnDestroy implements OnInit {
  commands: InitializedCommand[] = [];
  history$: Observable<InitializedCommand[]>;

  constructor(public terminalFacade: TerminalFacade, public commandFacade: CommandFacade) {
    super();
  }

  ngOnInit() {
    this.commandFacade.initializedCommand$.pipe(
      filter(intializedCommand => !!intializedCommand),
      takeUntil(this.destroy$)
    ).subscribe(x => this.commands.push(x));

    this.history$ = this.commandFacade.history$.pipe(
      distinctUntilChanged((x, y) => x.length === y.length)
    );
  }

  initiateCommand(text: string) {
    this.commandFacade.dispatch(new CommandInitiated(text));
  }
}
