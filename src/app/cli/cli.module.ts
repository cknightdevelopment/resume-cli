import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CliRoutingModule } from './cli-routing.module';
import { TerminalComponent } from './terminal/terminal.component';


@NgModule({
  declarations: [
    TerminalComponent
  ],
  imports: [
    CommonModule,
    CliRoutingModule
  ]
})
export class CliModule { }
