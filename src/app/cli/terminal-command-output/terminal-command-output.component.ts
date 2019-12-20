import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { InitializedCommand } from '../store/command/command.reducers';
import { ParsedCommandInput } from 'src/app/models/command/parsed-command-input.model';
import { CommandParserService } from 'src/app/core/command/command-parser/command-parser.service';

@Component({
  selector: 'app-terminal-command-output',
  templateUrl: './terminal-command-output.component.html',
  styleUrls: ['./terminal-command-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TerminalCommandOutputComponent implements OnInit {
  @Input() command: InitializedCommand;
  @ViewChild('commandOutput', {static: true, read: ViewContainerRef}) commandOutputRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private commandParserSvc: CommandParserService) { }

  ngOnInit() {
    if (!this.command) return;

    const parsedCommandInput = this.commandParserSvc.parseCommand(this.command.text);
    if (parsedCommandInput) {
      this.loadCommandComponent(parsedCommandInput);
    }
  }

  private loadCommandComponent(parsedCommandInput: ParsedCommandInput) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(parsedCommandInput.componentType);

    // this.commandOutputRef.clear();

    const componentRef = this.commandOutputRef.createComponent(componentFactory);
    componentRef.instance.params = parsedCommandInput.params;
  }
}
