import { merge as _merge } from 'lodash';
import { WorkHistoryModel } from 'src/app/models/chris/chris-data.model';

export function workHistoryModel(override?: Partial<WorkHistoryModel>): WorkHistoryModel {
  return _merge({
    employer: 'test employer',
    position: 'test position',
    start: 'test start',
    end: 'test end',
    details: [
      'test details 1',
      'test details 2'
    ]
  } as WorkHistoryModel, override);
}
