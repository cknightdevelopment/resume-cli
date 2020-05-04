import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { ResumeEffects } from './resume.effects';
import { LoadResumeData, LoadResumeDataSuccess } from './resume.actions';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ResumeService } from 'src/app/core/resume/resume.service';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';
import { Router, Event, ResolveStart } from '@angular/router';
import { CONSTANTS } from 'src/app/models/constants';
import { CustomizableResumeDataModel, InitHelpTypes, CliOptionsModel } from 'src/app/models/resume/resume-data.model';
import { environment } from 'src/environments/environment';

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
  options = {
    cliName: 'test',
    initHelp: InitHelpTypes.Always
  } as CliOptionsModel;
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
  throwError = false;
  error = { message: 'boo!' };

  getData(resumeDataUrl: string): Observable<CustomizableResumeDataModel> {
    if (this.throwError) {
      return throwError(this.error);
    }

    return of({
      options: this.options,
      facts: this.facts,
      education: this.edu,
      skills: this.skills,
      links: this.links,
      workHistory: this.workHistory,
      contact: this.contact
    });
  }
}

let actions$: Observable<Action>;
const testResumeDataUrl = 'http://test.com/data.json';

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
    const expected = cold('a', { a: new LoadResumeData() });

    expect(effects.init$).toBeObservable(expected);
  });

  it('should load static data after router emits resolve start event', () => {
    actions$ = cold('a', { a: new LoadResumeData() });
    const preEventExpected = cold('-');

    expect(effects.loadStaticData$).toBeObservable(preEventExpected);
    expect(resumeSvc.getData).not.toHaveBeenCalledWith();

    router.emitResolveStartEvent();

    const expected = cold('a', {
      a: new LoadResumeDataSuccess({
        facts: resumeSvc.facts,
        education: resumeSvc.edu,
        skills: resumeSvc.skills,
        links: resumeSvc.links,
        workHistory: resumeSvc.workHistory,
        contact: resumeSvc.contact,
        issue: CONSTANTS.ISSUE,
        help: CONSTANTS.HELP
      })
    });

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(environment.exampleResumeUrl);
  });

  it('should load static data from custom resume data url set in query string parameter', () => {
    router.emitResolveStartEvent(CONSTANTS.QUERY_STRING_PARAMS.RESUME_DATA_URL, testResumeDataUrl);

    actions$ = cold('a', { a: new LoadResumeData() });
    const expected = cold('a', {
      a: new LoadResumeDataSuccess({
        facts: resumeSvc.facts,
        education: resumeSvc.edu,
        skills: resumeSvc.skills,
        links: resumeSvc.links,
        workHistory: resumeSvc.workHistory,
        contact: resumeSvc.contact,
        issue: CONSTANTS.ISSUE,
        help: CONSTANTS.HELP
      })
    });

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(testResumeDataUrl);
  });

  it('should load static data from custom resume data url set in query string parameter, and be case insensitive', () => {
    router.emitResolveStartEvent(CONSTANTS.QUERY_STRING_PARAMS.RESUME_DATA_URL.toUpperCase(), testResumeDataUrl);

    actions$ = cold('a', { a: new LoadResumeData() });
    const expected = cold('a', {
      a: new LoadResumeDataSuccess({
        facts: resumeSvc.facts,
        education: resumeSvc.edu,
        skills: resumeSvc.skills,
        links: resumeSvc.links,
        workHistory: resumeSvc.workHistory,
        contact: resumeSvc.contact,
        issue: CONSTANTS.ISSUE,
        help: CONSTANTS.HELP
      })
    });

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(testResumeDataUrl);
  });

  it('should alert & console error when error occurs while getting resume data; return empty non-static resume data properties', () => {
    resumeSvc.throwError = true;
    spyOn(window, 'alert');
    spyOn(console, 'error');
    router.emitResolveStartEvent(CONSTANTS.QUERY_STRING_PARAMS.RESUME_DATA_URL.toUpperCase(), testResumeDataUrl);

    actions$ = cold('a', { a: new LoadResumeData() });
    const expected = cold('a', {
      a: new LoadResumeDataSuccess({
        facts: undefined,
        education: undefined,
        skills: undefined,
        links: undefined,
        workHistory: undefined,
        contact: undefined,
        issue: CONSTANTS.ISSUE,
        help: CONSTANTS.HELP
      })
    });
    const expectedErrorMessage = CONSTANTS.ERROR_MESSAGES.GET_RESUME_DATA(testResumeDataUrl);

    expect(effects.loadStaticData$).toBeObservable(expected);
    expect(resumeSvc.getData).toHaveBeenCalledWith(testResumeDataUrl);
    expect(window.alert).toHaveBeenCalledWith(expectedErrorMessage);
    expect(console.error).toHaveBeenCalledWith(expectedErrorMessage, resumeSvc.error);
  });

  describe('setting constants for cli options', () => {
    it('should disable commands without data', () => {
      resumeSvc.edu = null;
      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe((data) => {
        expect(CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.education).toBeFalsy();
        expect(data.payload.education).toEqual(null);
      });
    });

    it('should disable commands when data is empty array', () => {
      resumeSvc.edu = [];
      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe((data) => {
        expect(CONSTANTS.CLI_OPTIONS.ACTIVE_COMMANDS.education).toBeFalsy();
        expect(data.payload.education).toEqual([]);
      });
    });

    it('should assign cli options name & init help to true when configured', () => {
      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.NAME).toEqual(resumeSvc.options.cliName);
        expect(CONSTANTS.CLI_OPTIONS.INIT_HELP).toEqual(true);
      });
    });

    it('should assign cli options init help to false when configured to never', () => {
      resumeSvc.options.initHelp = InitHelpTypes.Never;

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.INIT_HELP).toEqual(false);
      });
    });

    it('should assign cli options init help to true when configured to first and storage returns falsy', () => {
      spyOn(localStorage, 'getItem').and.returnValue('');
      resumeSvc.options.initHelp = InitHelpTypes.First;

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HELP_INIT());
        expect(CONSTANTS.CLI_OPTIONS.INIT_HELP).toEqual(true);
      });
    });

    it('should assign cli options init help to false when configured to first and storage returns truthy', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(true));
      resumeSvc.options.initHelp = InitHelpTypes.First;

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.STORAGE_KEYS.HELP_INIT());
        expect(CONSTANTS.CLI_OPTIONS.INIT_HELP).toEqual(false);
      });
    });

    it('should not assign cli options name when not configured', () => {
      const origCliName = JSON.parse(JSON.stringify(CONSTANTS.CLI_OPTIONS.NAME)) as string;
      resumeSvc.options.cliName = null;

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.NAME).toEqual(origCliName);
      });
    });

    it('should not assign cli options init help when not configured', () => {
      const origInitHelp = JSON.parse(JSON.stringify(CONSTANTS.CLI_OPTIONS.INIT_HELP)) as boolean;
      resumeSvc.options.initHelp = null;

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.INIT_HELP).toEqual(origInitHelp);
      });
    });

    it('should not assign cli options name nor init help when not configured', () => {
      const origCliName = JSON.parse(JSON.stringify(CONSTANTS.CLI_OPTIONS.NAME)) as string;
      const origInitHelp = JSON.parse(JSON.stringify(CONSTANTS.CLI_OPTIONS.INIT_HELP)) as boolean;
      resumeSvc.options = null;

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.NAME).toEqual(origCliName);
        expect(CONSTANTS.CLI_OPTIONS.INIT_HELP).toEqual(origInitHelp);
      });
    });

    it('should assign cli options name to first item when split by space', () => {
      resumeSvc.options.cliName = 'test space';

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.NAME).toEqual('test');
      });
    });

    it('should assign cli options name to trimmed value', () => {
      resumeSvc.options.cliName = '   trim    ';

      router.emitResolveStartEvent();

      actions$ = cold('a', { a: new LoadResumeData() });

      effects.loadStaticData$.subscribe(() => {
        expect(CONSTANTS.CLI_OPTIONS.NAME).toEqual('trim');
      });
    });
  });
});
