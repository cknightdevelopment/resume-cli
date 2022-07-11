import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CliRoutingModule } from './cli-routing.module';
import { TerminalComponent } from './terminal/terminal.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { TerminalPromptComponent } from './terminal-prompt/terminal-prompt.component';
import { SharedModule } from '../shared/shared.module';
import { TerminalFacade } from './store/terminal/terminal.facade';
import { RandomCommandComponent } from './commands/random-command/random-command.component';
import { CommandFacade } from './store/command/command.facade';
import { TerminalCommandOutputComponent } from './terminal-command-output/terminal-command-output.component';
import { UnknownCommandComponent } from './commands/unknown-command/unknown-command.component';
import { InvalidArgumentComponent } from './commands/invalid-argument/invalid-argument.component';
import { MissingParameterComponent } from './commands/missing-parameter/missing-parameter.component';
import { UnknownParameterComponent } from './commands/unknown-parameter/unknown-parameter.component';
import { InvalidParameterComponent } from './commands/invalid-parameter/invalid-parameter.component';
import { UnknownCliComponent } from './commands/unknown-cli/unknown-cli.component';
import { HelpComponent } from './commands/help/help.component';
import { TerminalOutputComponent } from './terminal-output/terminal-output.component';
import { EffectsModule } from '@ngrx/effects';
import { CommandEffects } from './store/command/command.effects';
import { EducationComponent } from './commands/education/education.component';
import { SkillsComponent } from './commands/skills/skills.component';
import { LinksComponent } from './commands/links/links.component';
import { WorkHistoryComponent } from './commands/work-history/work-history.component';
import { IssueComponent } from './commands/issue/issue.component';
import { ContactComponent } from './commands/contact/contact.component';

const commandComponents = [
  RandomCommandComponent,
  UnknownCommandComponent,
  InvalidArgumentComponent,
  MissingParameterComponent,
  InvalidParameterComponent,
  UnknownParameterComponent,
  UnknownCliComponent,
  HelpComponent,
  EducationComponent,
  SkillsComponent,
  LinksComponent,
  WorkHistoryComponent,
  IssueComponent,
  ContactComponent
];

@NgModule({
  declarations: [
    TerminalComponent,
    TerminalPromptComponent,
    TerminalCommandOutputComponent,
    TerminalOutputComponent,
    ...commandComponents
  ],
  imports: [
    CommonModule,
    CliRoutingModule,
    SharedModule,
    StoreModule.forFeature('cli', reducers),
    EffectsModule.forFeature([
      CommandEffects
    ]),
  ],
  providers: [
    TerminalFacade,
    CommandFacade
  ]
})
export class CliModule { }
