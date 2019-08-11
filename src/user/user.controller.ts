import { from, throwError, of } from 'rxjs';
import { map, flatMap, pluck, mergeMap } from 'rxjs/operators';
import { RequestHandler } from 'express';
import { pick, pipe, ifElse, isNil } from 'ramda';

import User from './user.model';
import { missingParamsError } from './user.errors';

enum UserQueryParams {
  userId = 'user_id',
  userEmail = 'user_email'
}

type PublicUserInfo = {
  user_id?: string;
  user_email?: string;
  user_name?: string;
};

const mapDBEntityToResponse = pipe(
  pick(['user_id', 'user_email', 'user_name']),
  (publicUser: PublicUserInfo) => ({
    id: publicUser.user_id,
    email: publicUser.user_email,
    name: publicUser.user_name
  }),
  pick(['id', 'email', 'name'])
);

export const getUser: RequestHandler = (req, res, next) => {
  req.query$
    .pipe(
      pluck(UserQueryParams.userId),
      mergeMap(ifElse(isNil, () => throwError(missingParamsError(UserQueryParams.userId)), id => of({ id }))),
      map(User.find),
      flatMap(from),
      map((res = {}) => {
        return {
          status: 200,
          user: mapDBEntityToResponse(res)
        };
      })
    )
    .subscribe({
      next: user => res.json(user),
      error: next
    });
};

export const addUser: RequestHandler = (req, res, next) => {
  req.body$
    .pipe(
      map(({ user_name, user_id, user_pw, user_email }) => ({
        user_name,
        user_id,
        user_pw,
        user_email
      })),
      map(User.add),
      flatMap(from),
      map(res => ({
        status: res.status,
        user: mapDBEntityToResponse(res.user)
      }))
    )
    .subscribe({
      next: result => res.json(result),
      error: next
    });
};
