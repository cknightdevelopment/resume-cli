import { merge as _merge } from 'lodash';
import { EducationModel } from 'src/app/models/chris/chris-data.model';

export function educationModel(override?: Partial<EducationModel>): EducationModel {
  return _merge({
    college: {
      name: 'test name',
      url: 'test url',
      logo: 'test logo',
      location: 'test location',
      start: 'test start',
      end: 'test end',
      degree: 'test degree',
      highlights: ['test highlight 1', 'test highlight 2'],
      other: ['test other 1', 'test other 2']
    }
  } as EducationModel, override);
}