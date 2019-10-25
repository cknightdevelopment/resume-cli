import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'cli',
    pathMatch: 'full'
  },
  {
    path: 'cli',
    loadChildren: () => import('./cli/cli.module').then(m => m.CliModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
