import { mergeWith as _mergeWith } from 'lodash';
import { LinkModel } from 'src/app/models/chris/chris-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function linkModel(override?: Partial<LinkModel>): LinkModel {
  return _mergeWith({
    icon: 'test icon',
    title: 'test title',
    url: 'test url'
  } as LinkModel, override, replaceArrayCustomizer);
}
