import { mergeWith as _mergeWith } from 'lodash';
import { EducationModel } from 'src/app/models/resume/resume-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function educationModel(override?: Partial<EducationModel>): EducationModel {
  return _mergeWith({
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
  } as EducationModel, override, replaceArrayCustomizer);
}
