import { mergeWith as _mergeWith } from 'lodash';
import { IssueModel } from 'src/app/models/resume/resume-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function issueModel(override?: Partial<IssueModel>): IssueModel {
  return _mergeWith({
    url: 'http://test.com'
  } as IssueModel, override, replaceArrayCustomizer);
}
