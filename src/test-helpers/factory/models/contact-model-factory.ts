import { merge as _merge } from 'lodash';
import { EducationModel, ContactModel } from 'src/app/models/chris/chris-data.model';

export function contactModel(override?: Partial<ContactModel>): ContactModel {
  return _merge({
    email: 'test email',
    phone: 'test phone'
  } as ContactModel, override);
}
