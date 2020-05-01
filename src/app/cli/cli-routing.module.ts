import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminalComponent } from './terminal/terminal.component';
import { ResumeDataLoadedResolver } from '../resolvers/resume-data-loaded.resolver';


const routes: Routes = [
  {
    path: '',
    component: TerminalComponent,
    resolve: {
      ready: ResumeDataLoadedResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CliRoutingModule { }
