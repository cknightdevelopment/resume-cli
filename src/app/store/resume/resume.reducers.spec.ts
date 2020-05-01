import * as factory from 'src/test-helpers/factory/state';
import { NoopAction } from 'src/test-helpers/noop-action';
import { ResumeState, reducer, intitalState } from './resume.reducers';
import { LoadStaticDataSuccess } from './resume.actions';
import { educationModel, linkModel, workHistoryModel, contactModel, issueModel, helpModel } from 'src/test-helpers/factory/models';
import { skillSetModel } from 'src/test-helpers/factory/models/skill-set-model-factory';


describe('NGRX Reducers: Resume', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, new NoopAction() as any)).toEqual(intitalState);
  });

  it('should perform full data reset of static data', () => {
    const data = factory.resumeState({
      facts: ['test fact'],
      education: [educationModel()],
      skills: [skillSetModel()],
      links: [linkModel()],
      workHistory: [workHistoryModel()],
      contact: contactModel(),
      issue: issueModel(),
      help: helpModel()
    });
    expect(reducer(intitalState, new LoadStaticDataSuccess(data))).toEqual(jasmine.objectContaining<ResumeState>({
      facts: data.facts,
      education: data.education,
      skills: data.skills,
      links: data.links,
      workHistory: data.workHistory,
      contact: data.contact,
      issue: data.issue,
      help: data.help
    }));
  });
});
