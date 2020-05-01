import { mergeWith as _mergeWith } from 'lodash';
import { ResumeState } from 'src/app/store/resume/resume.reducers';
import { contactModel, educationModel, helpModel, issueModel, linkModel, skillSetModel, workHistoryModel } from '../models';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function resumeState(override?: Partial<ResumeState>): ResumeState {
  return _mergeWith({
    facts: ['fact1', 'fact2'],
    contact: contactModel(),
    education: [educationModel()],
    help: helpModel(),
    issue: issueModel(),
    links: [linkModel()],
    skills: [skillSetModel()],
    workHistory: [workHistoryModel()]
  } as ResumeState, override, replaceArrayCustomizer);
}
