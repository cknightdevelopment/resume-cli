import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/store';
import { TestBed } from '@angular/core/testing';
import { ResumeFacade } from './resume.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoadResumeData } from './resume.actions';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel, helpModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

describe('NGRX Facade: Resume', () => {
  let appState: AppState;
  let facade: ResumeFacade;
  let mockStore: MockStore<AppState>;

  beforeEach(() => {
    appState = factory.appState();

    TestBed.configureTestingModule({
      providers: [
        ResumeFacade,
        provideMockStore({ initialState: appState })
      ]
    });

    mockStore = TestBed.get(Store);
    facade = TestBed.get(ResumeFacade);
  });

  it('should dispatch actions', () => {
    spyOn(mockStore, 'dispatch');
    const action = new LoadResumeData();
    facade.dispatch(action);
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should get facts from store', () => {
    const facts = ['test fact'];
    mockStore.setState(factory.appState({
      resume: factory.resumeState({ facts })
    }));

    const expected = cold('a', { a: facts });

    expect(facade.facts$).toBeObservable(expected);
  });

  it('should get education from store', () => {
    const edu = [educationModel()];
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        education: edu
      })
    }));

    const expected = cold('a', { a: edu });

    expect(facade.education$).toBeObservable(expected);
  });

  it('should get skills from store', () => {
    const skillSets = [skillSetModel()];
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        skills: skillSets
      })
    }));

    const expected = cold('a', { a: skillSets });

    expect(facade.skills$).toBeObservable(expected);
  });

  it('should get links from store', () => {
    const links = [linkModel()];
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        links
      })
    }));

    const expected = cold('a', { a: links });

    expect(facade.links$).toBeObservable(expected);
  });

  it('should get work history from store', () => {
    const workHistory = [workHistoryModel()];
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        workHistory
      })
    }));

    const expected = cold('a', { a: workHistory });

    expect(facade.workHistory$).toBeObservable(expected);
  });

  it('should get contact from store', () => {
    const contact = contactModel();
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        contact
      })
    }));

    const expected = cold('a', { a: contact });

    expect(facade.contact$).toBeObservable(expected);
  });

  it('should get issue from store', () => {
    const issue = issueModel();
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        issue
      })
    }));

    const expected = cold('a', { a: issue });

    expect(facade.issue$).toBeObservable(expected);
  });

  it('should get help from store', () => {
    const help = helpModel();
    mockStore.setState(factory.appState({
      resume: factory.resumeState({
        help
      })
    }));

    const expected = cold('a', { a: help });

    expect(facade.help$).toBeObservable(expected);
  });
});
