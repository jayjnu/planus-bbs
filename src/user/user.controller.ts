import { from, throwError, of } from 'rxjs';
import { map, flatMap, pluck, mergeMap, catchError } from 'rxjs/operators';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { pick, pipe, ifElse, isNil } from 'ramda';

import User, { IUser } from './user.model';
import { missingParamsError, notFoundError } from './user.errors';

enum UserQueryParams {
  userId = 'user_id',
  userEmail = 'user_email'
}

type PublicUserInfo = {
  user_id?: string;
  user_email?: string;
  user_name?: string;
};

const mapDBEntityToUser = pipe(
  pick(['user_id', 'user_email', 'user_name']),
  (publicUser: PublicUserInfo) => ({
    id: publicUser.user_id,
    email: publicUser.user_email,
    name: publicUser.user_name
  }),
  pick(['id', 'email', 'name'])
);

const toJSON = (req: Request, res: Response, next: NextFunction) => {
  return {
    next: (result: any) => res.json(result),
    error: next
  };
};

const extractBodyParamsToDBQuery = ({ user_name, user_id, user_pw, user_email }: IUser) => ({
  user_name,
  user_id,
  user_pw,
  user_email
});

const mapDBEntityToResponse = (status: number) => (res: { status: string; user: IUser }) => ({
  status,
  user: mapDBEntityToUser(res.user)
});

const checkUserId = ifElse(isNil, () => throwError(missingParamsError(UserQueryParams.userId)), id => of({ id }));

export const getUser: RequestHandler = (req, res, next) => {
  req.query$
    .pipe(
      pluck(UserQueryParams.userId),
      mergeMap(checkUserId),
      map(User.find),
      flatMap(from),
      map(mapDBEntityToResponse(200))
    )
    .subscribe(toJSON(req, res, next));
};

export const addUser: RequestHandler = (req, res, next) => {
  req.body$
    .pipe(
      map(extractBodyParamsToDBQuery),
      map(User.add),
      flatMap(from),
      map(mapDBEntityToResponse(200))
    )
    .subscribe(toJSON(req, res, next));
};

export const updateUser: RequestHandler = (req, res, next) => {
  req.body$
    .pipe(
      map(extractBodyParamsToDBQuery),
      map(User.update),
      flatMap(from),
      catchError(val => throwError(notFoundError(val))),
      map(mapDBEntityToResponse(200))
    )
    .subscribe(toJSON(req, res, next));
};
