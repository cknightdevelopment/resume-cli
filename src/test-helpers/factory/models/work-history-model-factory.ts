import { mergeWith as _mergeWith } from 'lodash';
import { WorkHistoryModel } from 'src/app/models/resume/resume-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function workHistoryModel(override?: Partial<WorkHistoryModel>): WorkHistoryModel {
  return _mergeWith({
    employer: 'test employer',
    position: 'test position',
    start: 'test start',
    end: 'test end',
    details: [
      'test details 1',
      'test details 2'
    ]
  } as WorkHistoryModel, override, replaceArrayCustomizer);
}
