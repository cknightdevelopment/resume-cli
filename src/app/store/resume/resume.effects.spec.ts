import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { ResumeEffects } from './resume.effects';
import { LoadStaticData, LoadStaticDataSuccess } from './resume.actions';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ResumeService } from 'src/app/core/resume/resume.service';
import { ResumeDataModel } from 'src/app/models/resume/resume-data.model';
import { educationModel, helpModel, linkModel, workHistoryModel, contactModel, issueModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

class MockResumeService {
  cliName: 'test';
  facts = [
    'Resume does Crossfit.',
    'Resume went to music school for bass guitar.',
    'Resume loves stand up comedy.',
  ];
  edu = educationModel();
  skills = [skillSetModel()];
  links = [linkModel()];
  workHistory = [workHistoryModel()];
  contact = contactModel();
  issue = issueModel();
  help = helpModel();

  getData(): Observable<ResumeDataModel> {
    return of({
      cliName: this.cliName,
      facts: this.facts,
      education: this.edu,
      skills: this.skills,
      links: this.links,
      workHistory: this.workHistory,
      contact: this.contact,
      issue: this.issue,
      help: this.help
    });
  }
}

let actions$: Observable<Action>;

describe('NGRX Effects: Resume', () => {
  let facade: ResumeEffects;
  let resumeSvc: MockResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResumeEffects,
        provideMockActions(() => actions$),
        { provide: ResumeService, useClass: MockResumeService }
      ],
    });

    facade = TestBed.get(ResumeEffects);
    resumeSvc = TestBed.get(ResumeService);
  });

  it('should dispatch load static data on root effects init', () => {
    actions$ = cold('a', { a: { type: ROOT_EFFECTS_INIT } });
    const expected = cold('a', { a: new LoadStaticData() });

    expect(facade.init$).toBeObservable(expected);
  });

  it('should load static data', () => {
    actions$ = cold('a', { a: new LoadStaticData() });
    const expected = cold('a', {
      a: new LoadStaticDataSuccess({
        facts: resumeSvc.facts,
        education: resumeSvc.edu,
        skills: resumeSvc.skills,
        links: resumeSvc.links,
        workHistory: resumeSvc.workHistory,
        contact: resumeSvc.contact,
        issue: resumeSvc.issue,
        help: resumeSvc.help
      })
    });

    expect(facade.loadStaticData$).toBeObservable(expected);
  });
});
