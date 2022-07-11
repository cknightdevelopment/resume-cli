import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { Observable } from 'rxjs';
import { ResumeAction } from './resume.actions';
// eslint-disable-next-line max-len
import { selectFacts, selectEducation, selectSkills, selectLinks, selectWorkHistory, selectContact, selectIssue, selectHelp } from './resume.selectors';
// eslint-disable-next-line max-len
import { EducationModel, SkillSetModel, LinkModel, WorkHistoryModel, ContactModel, IssueModel, HelpModel } from 'src/app/models/resume/resume-data.model';

@Injectable()
export class ResumeFacade {
  facts$: Observable<string[]> = this.store.select(selectFacts);
  education$: Observable<EducationModel[]> = this.store.select(selectEducation);
  skills$: Observable<SkillSetModel[]> = this.store.select(selectSkills);
  links$: Observable<LinkModel[]> = this.store.select(selectLinks);
  workHistory$: Observable<WorkHistoryModel[]> = this.store.select(selectWorkHistory);
  contact$: Observable<ContactModel> = this.store.select(selectContact);
  issue$: Observable<IssueModel> = this.store.select(selectIssue);
  help$: Observable<HelpModel> = this.store.select(selectHelp);

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: ResumeAction): void {
    this.store.dispatch(action);
  }
}
