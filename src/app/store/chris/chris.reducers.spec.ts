import * as factory from 'src/test-helpers/factory/state';
import { NoopAction } from 'src/test-helpers/noop-action';
import { ChrisState, reducer, intitalState } from './chris.reducers';
import { LoadStaticDataSuccess } from './chris.actions';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';


describe('NGRX Reducers: Chris', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, new NoopAction() as any)).toEqual(intitalState);
  });

  it('should perform full data reset of static data', () => {
    const data = factory.chrisState({
      facts: ['test fact'],
      education: educationModel(),
      skills: [skillSetModel()],
      links: [linkModel()],
      workHistory: [workHistoryModel()],
      contact: contactModel(),
      issue: issueModel()
    });
    expect(reducer(intitalState, new LoadStaticDataSuccess(data))).toEqual(jasmine.objectContaining<ChrisState>({
      facts: data.facts,
      education: data.education,
      skills: data.skills,
      links: data.links,
      workHistory: data.workHistory,
      contact: data.contact,
      issue: data.issue
    }));
  });
});
