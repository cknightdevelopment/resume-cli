import * as factory from 'src/test-helpers/factory/state';
import { AppState } from 'src/app/store';
import { TestBed } from '@angular/core/testing';
import { ChrisFacade } from './chris.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoadStaticData } from './chris.actions';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel, helpModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

describe('NGRX Facade: Chris', () => {
  let appState: AppState;
  let facade: ChrisFacade;
  let mockStore: MockStore<AppState>;

  beforeEach(() => {
    appState = factory.appState();

    TestBed.configureTestingModule({
      providers: [
        ChrisFacade,
        provideMockStore({ initialState: appState })
      ]
    });

    mockStore = TestBed.get(Store);
    facade = TestBed.get(ChrisFacade);
  });

  it('should dispatch actions', () => {
    spyOn(mockStore, 'dispatch');
    const action = new LoadStaticData();
    facade.dispatch(action);
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should get facts from store', () => {
    const facts = ['test fact'];
    mockStore.setState(factory.appState({
      chris: factory.chrisState({ facts })
    }));

    const expected = cold('a', { a: facts });

    expect(facade.facts$).toBeObservable(expected);
  });

  it('should get education from store', () => {
    const edu = educationModel();
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        education: edu
      })
    }));

    const expected = cold('a', { a: edu });

    expect(facade.education$).toBeObservable(expected);
  });

  it('should get skills from store', () => {
    const skillSets = [skillSetModel()];
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        skills: skillSets
      })
    }));

    const expected = cold('a', { a: skillSets });

    expect(facade.skills$).toBeObservable(expected);
  });

  it('should get links from store', () => {
    const links = [linkModel()];
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        links
      })
    }));

    const expected = cold('a', { a: links });

    expect(facade.links$).toBeObservable(expected);
  });

  it('should get work history from store', () => {
    const workHistory = [workHistoryModel()];
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        workHistory
      })
    }));

    const expected = cold('a', { a: workHistory });

    expect(facade.workHistory$).toBeObservable(expected);
  });

  it('should get contact from store', () => {
    const contact = contactModel();
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        contact
      })
    }));

    const expected = cold('a', { a: contact });

    expect(facade.contact$).toBeObservable(expected);
  });

  it('should get issue from store', () => {
    const issue = issueModel();
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        issue
      })
    }));

    const expected = cold('a', { a: issue });

    expect(facade.issue$).toBeObservable(expected);
  });

  it('should get help from store', () => {
    const help = helpModel();
    mockStore.setState(factory.appState({
      chris: factory.chrisState({
        help
      })
    }));

    const expected = cold('a', { a: help });

    expect(facade.help$).toBeObservable(expected);
  });
});
