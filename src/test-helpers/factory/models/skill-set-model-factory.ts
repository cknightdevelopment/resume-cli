import { merge as _merge } from 'lodash';
import { SkillSetModel } from 'src/app/models/chris/chris-data.model';

export function skillSetModel(override?: Partial<SkillSetModel>): SkillSetModel {
  return _merge({
    title: 'Skill Set 1',
    maxRating: 5,
    ratings: [
      { name: 'Rating 1', rating: 5 },
      { name: 'Rating 2', rating: 2.5 }
    ]
  } as SkillSetModel, override);
}
