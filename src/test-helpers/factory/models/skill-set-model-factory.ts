import { mergeWith as _mergeWith } from 'lodash';
import { SkillSetModel } from 'src/app/models/resume/resume-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function skillSetModel(override?: Partial<SkillSetModel>): SkillSetModel {
  return _mergeWith({
    title: 'Skill Set 1',
    maxRating: 5,
    ratings: [
      { name: 'Rating 1', rating: 5 },
      { name: 'Rating 2', rating: 2.5 }
    ]
  } as SkillSetModel, override, replaceArrayCustomizer);
}
