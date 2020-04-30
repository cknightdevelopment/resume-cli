import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ResumeEffects } from './store/resume/resume.effects';
import { ResumeFacade } from './store/resume/resume.facade';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([
      ResumeEffects
    ]),
    StoreDevtoolsModule.instrument({
      predicate: canUseStoreDevTools
    }),
    CoreModule,
    SharedModule
  ],
  providers: [
    ResumeFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT build requires this to be an exported function
export function canUseStoreDevTools(state: any, action: Action) {
  return !environment.production;
}
