import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-checker';
import { ResumeService } from './resume/resume.service';
import { CommandService } from './command/command.service';
import { CommandParserService } from './command/command-parser/command-parser.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ResumeService,
    CommandService,
    CommandParserService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
