import * as R from 'ramda';
import { IUserModel, IUserForm, IUserQuery, IUserDBRequest } from './user.interfaces';

export const mapFormDataToDBRequest = R.pipe(
  R.pick(['username', 'email_address', 'first_name', 'last_name', 'addresses']),
  (formData: IUserForm): IUserDBRequest<IUserForm> => {
    return {
      condition: {
        username: formData.username
      },
      document: {
        ...formData
      }
    };
  }
);

export const mapDBEntityToResponse = R.curry((field: string, status: number, res: IUserModel | IUserModel[]) => ({
  status,
  [field]: Array.isArray(res) ? res.map(mapDBEntityToUser) : mapDBEntityToUser(res)
}));

export const mapDBEntityToUser = R.pipe(
  R.tap(res => console.log(res)),
  R.defaultTo({}),
  R.pick(['username', 'email_address', 'thumb_profile'])
);
