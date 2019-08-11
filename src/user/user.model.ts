export interface FindQuery {
  id: string;
}

export interface AddQuery {
  user_name: string;
  user_id: string;
  user_pw: string;
  user_email: string;
}

export interface IUser {
  user_name: string;
  user_id: string;
  user_pw: string;
  user_email: string;
}

export interface IAddResult {
  status: string;
  user: AddQuery;
}

const fakeDb: { [id: string]: IUser } = {};

export default {
  find: (query: FindQuery): Promise<IUser | never> => Promise.resolve(fakeDb[query.id]),
  add: (query: AddQuery): Promise<IAddResult> => {
    fakeDb[query.user_id] = query;
    return Promise.resolve({ status: 'success', user: query });
  }
};
