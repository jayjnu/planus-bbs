import mongoose, { Schema } from 'mongoose';
import { IUserModel, IUserListQuery, IUserQuery } from './user.interfaces';

export enum UserQueryParams {
  userId = 'username',
  userEmail = 'email_address'
}

export const User = mongoose.model<IUserModel>(
  'User',
  new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    first_name: String,
    last_name: String,
    email_address: { type: String, required: true },
    addresses: [String]
  })
);

export const getUserList = (query: IUserListQuery) =>
  User.find()
    .skip(query.n * (query.p - 1))
    .exec();

export const getUserByUsername = (query: IUserQuery) => User.findOne({ username: query.username }).exec();

export default User;
