import { from, throwError, of } from 'rxjs';
import { map, flatMap, pluck, mergeMap, catchError, tap } from 'rxjs/operators';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import * as R from 'ramda';

import { ifNill } from '../utils/type';
import User, { IUser } from './user.model';
import { missingParamsError, notFoundError } from './user.errors';
import * as converter from './user.converter';

enum UserQueryParams {
  userId = 'user_id',
  userEmail = 'user_email'
}

export type PublicUserInfo = {
  user_id?: string;
  user_email?: string;
  user_name?: string;
};

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
    map(converter.mapDBEntityToResponse(200))
  );

  next();
};

export const addUser: RequestHandler = (req, res, next) => {
  req.user$ = req.body$.pipe(
    map(converter.extractBodyParamsToDBQuery),
    map(User.add),
    flatMap(from),
    map(converter.mapDBEntityToResponse(200))
  );

  next();
};

export const updateUser: RequestHandler = (req, res, next) => {
  req.user$ = req.body$.pipe(
    map(converter.extractBodyParamsToDBQuery),
    map(User.update),
    flatMap(from),
    catchError(val => throwError(notFoundError(val))),
    map(converter.mapDBEntityToResponse(200))
  );

  next();
};
