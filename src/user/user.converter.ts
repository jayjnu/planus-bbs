import { IUser } from './user.model';
import * as R from 'ramda';
import { PublicUserInfo } from './user.controller';

export const extractBodyParamsToDBQuery = ({ user_name, user_id, user_pw, user_email }: IUser) => ({
  user_name,
  user_id,
  user_pw,
  user_email
});

export const mapDBEntityToResponse = (status: number) => (res: { status: string; user: IUser }) => ({
  status,
  user: mapDBEntityToUser(res.user)
});

export const mapDBEntityToUser = R.pipe(
  R.defaultTo({}),
  R.pick(['user_id', 'user_email', 'user_name']),
  (publicUser: PublicUserInfo) => ({
    id: publicUser.user_id,
    email: publicUser.user_email,
    name: publicUser.user_name
  }),
  R.pick(['id', 'email', 'name'])
);
