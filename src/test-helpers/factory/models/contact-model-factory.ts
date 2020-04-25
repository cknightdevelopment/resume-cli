import { mergeWith as _mergeWith } from 'lodash';
import { ContactModel } from 'src/app/models/chris/chris-data.model';
import { replaceArrayCustomizer } from 'src/test-helpers/factory-helpers';

export function contactModel(override?: Partial<ContactModel>): ContactModel {
  return _mergeWith({
    email: 'test email',
    phone: 'test phone'
  } as ContactModel, override, replaceArrayCustomizer);
}
