import { merge as _merge } from 'lodash';
import { LinkModel } from 'src/app/models/chris/chris-data.model';

export function linkModel(override?: Partial<LinkModel>): LinkModel {
  return _merge({
    icon: 'test icon',
    title: 'test title',
    url: 'test url'
  } as LinkModel, override);
}
