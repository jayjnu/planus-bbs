import { from, throwError } from 'rxjs';
import { map, flatMap, catchError, tap } from 'rxjs/operators';
import { RequestHandler } from 'express';

import User, { UserQueryParams, getUserByUsername, getUserList } from './user.model';
import * as error from './user.errors';
import * as converter from './user.converter';
import { IUserQuery, IUserListQuery } from './user.interfaces';

const mapUsersToResponse = converter.mapDBEntityToResponse('users');
const mapUserToResponse = converter.mapDBEntityToResponse('user');

const getUsers = (query: IUserListQuery) => from(getUserList(query)).pipe(map(mapUsersToResponse(200)));
const getOneUser = (query: IUserQuery) => from(getUserByUsername(query)).pipe(map(mapUserToResponse(200)));

export const getUser: RequestHandler = (req, res, next) => {
  req.user$ = req.query$.pipe(
    tap(query => console.log(query)),
    flatMap(query => (query[UserQueryParams.userId] ? getOneUser(query) : getUsers(query)))
  );

  next();
};

export const addUser: RequestHandler = (req, res, next) => {
  req.user$ = req.body$.pipe(
    map(converter.mapFormDataToDBRequest),
    flatMap(dbQuery => from(User.create(dbQuery.document))),
    catchError(err => throwError(error.duplicateUserError(err)))
  );

  next();
};

export const updateUser: RequestHandler = (req, res, next) => {
  req.user$ = req.body$.pipe(
    map(converter.mapFormDataToDBRequest),
    flatMap(({ condition, document }) => from(User.findOneAndUpdate(condition, document).exec())),
    catchError(val => throwError(error.notFoundError(val)))
  );

  next();
};
