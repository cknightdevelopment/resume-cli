import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { ChrisEffects } from './chris.effects';
import { LoadStaticData, LoadStaticDataSuccess } from './chris.actions';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ChrisService } from 'src/app/core/chris/chris.service';
import { ChrisDataModel } from 'src/app/models/chris/chris-data.model';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';

class MockChrisService {
  facts = [
    'Chris does Crossfit.',
    'Chris went to music school for bass guitar.',
    'Chris loves stand up comedy.',
  ];
  edu = educationModel();
  skills = [skillSetModel()];
  links = [linkModel()];
  workHistory = [workHistoryModel()];
  contact = contactModel();
  issue = issueModel();

  getData(): Observable<ChrisDataModel> {
    return of({
      facts: this.facts,
      education: this.edu,
      skills: this.skills,
      links: this.links,
      workHistory: this.workHistory,
      contact: this.contact,
      issue: this.issue
    });
  }
}

let actions$: Observable<Action>;

describe('NGRX Effects: Chris', () => {
  let facade: ChrisEffects;
  let chrisSvc: MockChrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChrisEffects,
        provideMockActions(() => actions$),
        { provide: ChrisService, useClass: MockChrisService }
      ],
    });

    facade = TestBed.get(ChrisEffects);
    chrisSvc = TestBed.get(ChrisService);
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
        facts: chrisSvc.facts,
        education: chrisSvc.edu,
        skills: chrisSvc.skills,
        links: chrisSvc.links,
        workHistory: chrisSvc.workHistory,
        contact: chrisSvc.contact,
        issue: chrisSvc.issue
      })
    });

    expect(facade.loadStaticData$).toBeObservable(expected);
  });
});
