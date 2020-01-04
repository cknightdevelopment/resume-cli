import { merge as _merge } from 'lodash';
import { EducationModel, IssueModel } from 'src/app/models/chris/chris-data.model';

export function issueModel(override?: Partial<IssueModel>): IssueModel {
  return _merge({
    url: 'test url'
  } as IssueModel, override);
}
