import { Document } from 'mongoose';

export interface IUserThumbProfile {
  small: string;
  medium: string;
  big: string;
}

export interface IUser {
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
  addresses: string[];
  thumb_profile?: IUserThumbProfile;
}

export interface IUserQuery {
  username?: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
}

export interface IUserResponse {
  username: string;
  email_address: string;
  first_name: string;
  last_name: string;
  thumb_profile: IUserThumbProfile;
}

export interface IUserDBRequest<Document> {
  condition: IUserQuery;
  document: Document;
}

export interface IUserListQuery {
  p: number;
  n: number;
}

export interface IUserForm extends IUser {}

export interface IUserModel extends IUser, Document {}
