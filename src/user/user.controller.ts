import { from, throwError, of } from 'rxjs';
import { map, flatMap, pluck, mergeMap, catchError, tap } from 'rxjs/operators';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import * as R from 'ramda';

import { ifNill } from '../utils/type';
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

const mapDBEntityToUser = R.pipe(
  R.defaultTo({}),
  R.tap(data => console.log(data)),
  R.pick(['user_id', 'user_email', 'user_name']),
  (publicUser: PublicUserInfo) => ({
    id: publicUser.user_id,
    email: publicUser.user_email,
    name: publicUser.user_name
  }),
  R.pick(['id', 'email', 'name'])
);

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

const checkUserId = ifNill(() => throwError(missingParamsError(UserQueryParams.userId)), id => of({ user_id: id }));

export const getUser: RequestHandler = (req, res, next) => {
  req.user$ = req.query$.pipe(
    pluck(UserQueryParams.userId),
    tap(id => console.log(id)),
    mergeMap(checkUserId),
    map(User.find),
    flatMap(from),
    tap(data => {
      console.log(data);
    }),
    map(mapDBEntityToResponse(200))
  );

  next();
};

export const addUser: RequestHandler = (req, res, next) => {
  req.user$ = req.body$.pipe(
    map(extractBodyParamsToDBQuery),
    map(User.add),
    flatMap(from),
    map(mapDBEntityToResponse(200))
  );

  next();
};

export const updateUser: RequestHandler = (req, res, next) => {
  req.user$ = req.body$.pipe(
    map(extractBodyParamsToDBQuery),
    map(User.update),
    flatMap(from),
    catchError(val => throwError(notFoundError(val))),
    map(mapDBEntityToResponse(200))
  );

  next();
};
