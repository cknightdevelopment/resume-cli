// tslint:disable-next-line: max-line-length
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { TerminalCommandOutputParam } from '../terminal/terminal.component';

@Component({
  selector: 'app-terminal-command-output',
  templateUrl: './terminal-command-output.component.html',
  styleUrls: ['./terminal-command-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TerminalCommandOutputComponent implements OnInit {
  @Input() command: TerminalCommandOutputParam;
  @ViewChild('commandOutput', { static: true, read: ViewContainerRef }) commandOutputRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.command || !this.command.initialized || !this.command.parsed) return;

    this.loadCommandComponent(this.command.parsed);
  }

  private loadCommandComponent(parsedCommandInput: ParsedCommandInput) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(parsedCommandInput.componentType);

    // this.commandOutputRef.clear();

    const componentRef = this.commandOutputRef.createComponent(componentFactory);
    componentRef.instance.params = parsedCommandInput.params;
  }
}
