import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, Subject, ReplaySubject } from 'rxjs';
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
import { Router, Event, ResolveStart } from '@angular/router';
import { CONSTANTS } from 'src/app/models/constants';

class MockRouter {
  events = new ReplaySubject<Event>(1);

  emitResolveStartEvent(resumeDataUrlQueryStringKey?: string, resumeDataUrl?: string) {
    this.events.next(new ResolveStart(1, '', '', {
      root: {
        queryParams: {
          [resumeDataUrlQueryStringKey]: resumeDataUrl
        }
      }
    } as any));
  }
}

class MockResumeService {
  cliName: 'test';
  facts = [
    'Resume does Crossfit.',
    'Resume went to music school for bass guitar.',
    'Resume loves stand up comedy.',
  ];
  edu = [educationModel()];
  skills = [skillSetModel()];
  links = [linkModel()];
  workHistory = [workHistoryModel()];
  contact = contactModel();
  issue = issueModel();
  help = helpModel();

  getData(resumeDataUrl: string): Observable<ResumeDataModel> {
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
  let effects: ResumeEffects;
  let resumeSvc: MockResumeService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResumeEffects,
        provideMockActions(() => actions$),
        { provide: ResumeService, useClass: MockResumeService },
        { provide: Router, useClass: MockRouter }
      ],
    });

    effects = TestBed.get(ResumeEffects);
    resumeSvc = TestBed.get(ResumeService);
    router = TestBed.get(Router);
    spyOn(resumeSvc, 'getData').and.callThrough();
  });

  it('should dispatch load static data on root effects init', () => {
    actions$ = cold('a', { a: { type: ROOT_EFFECTS_INIT } });
    const expected = cold('a', { a: new LoadStaticData() });

    expect(effects.init$).toBeObservable(expected);
  });

  it('should load static data after router emits resolve start event', () => {
    actions$ = cold('a', { a: new LoadStaticData() });
    const preEventExpected = cold('-');

    expect(effects.loadStaticData$).toBeObservable(preEventExpected);
    expect(resumeSvc.getData).not.toHaveBeenCalledWith();

    router.emitResolveStartEvent();

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

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(undefined);
  });

  it('should load static data from custom resume data url set in query string parameter', () => {
    const resumeDataUrl = 'http://test.com/data.json';
    router.emitResolveStartEvent(CONSTANTS.QUERY_STRING_PARAMS.RESUME_DATA_URL, resumeDataUrl);

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

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(resumeDataUrl);
  });

  it('should load static data from custom resume data url set in query string parameter, and be case insensitive', () => {
    const resumeDataUrl = 'http://test.com/data.json';
    router.emitResolveStartEvent(CONSTANTS.QUERY_STRING_PARAMS.RESUME_DATA_URL.toUpperCase(), resumeDataUrl);

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

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(resumeDataUrl);
  });
});
