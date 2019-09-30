import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CliRoutingModule } from './cli-routing.module';
import { TerminalComponent } from './terminal/terminal.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { TerminalPromptComponent } from './terminal-prompt/terminal-prompt.component';
import { SharedModule } from '../shared/shared.module';
import { TerminalFacade } from './store/terminal/terminal.facade';


@NgModule({
  declarations: [
    TerminalComponent,
    TerminalPromptComponent
  ],
  imports: [
    CommonModule,
    CliRoutingModule,
    SharedModule,
    StoreModule.forFeature('cli', reducers)
  ],
  providers: [
    TerminalFacade
  ]
})
export class CliModule { }
