import { mergeWith as _mergeWith } from 'lodash';
import { ChrisState } from 'src/app/store/chris/chris.reducers';
import { contactModel, educationModel, helpModel, issueModel, linkModel, skillSetModel, workHistoryModel } from '../models';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function chrisState(override?: Partial<ChrisState>): ChrisState {
  return _mergeWith({
    facts: ['fact1', 'fact2'],
    contact: contactModel(),
    education: educationModel(),
    help: helpModel(),
    issue: issueModel(),
    links: [linkModel()],
    skills: [skillSetModel()],
    workHistory: [workHistoryModel()]
  } as ChrisState, override, replaceArrayCustomizer);
}
