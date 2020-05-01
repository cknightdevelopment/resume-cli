import { NgModule } from '@angular/core';
import { TerminalFacade } from 'src/app/cli/store/terminal/terminal.facade';
import { appState, cliState } from './factory/state';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as cli from 'src/app/cli/store';
import * as app from 'src/app/store';
import { CommandFacade } from 'src/app/cli/store/command/command.facade';
import { TerminalOutputComponent } from 'src/app/cli/terminal-output/terminal-output.component';


@NgModule({
  declarations: [
    TerminalOutputComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forRoot(app.reducers, {
      metaReducers: app.metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
      initialState: appState()
    }),
    StoreModule.forFeature('cli', cli.reducers, {
      initialState: cliState()
    })
  ],
  exports: [
    SharedModule,
    TerminalOutputComponent
  ],
  providers: [
    TerminalFacade,
    CommandFacade
  ]
})
export class TestModule { }
