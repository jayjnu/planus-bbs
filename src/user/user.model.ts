export interface FindQuery {
  id: string;
}

export interface GeneralInsertQuery {
  user_name: string;
  user_id: string;
  user_pw: string;
  user_email: string;
}

export interface GeneralResponse {
  status: string;
  user: IUser;
}

export interface IUser {
  user_name: string;
  user_id: string;
  user_pw: string;
  user_email: string;
}

const fakeDb: { [id: string]: IUser } = {};

export default {
  find: (query: FindQuery): Promise<GeneralResponse | never> => Promise.resolve({ status: 'success', user: fakeDb[query.id] }),
  add: (query: GeneralInsertQuery): Promise<GeneralResponse> => {
    fakeDb[query.user_id] = query;
    return Promise.resolve({ status: 'success', user: query });
  },
  update: (query: GeneralInsertQuery): Promise<GeneralResponse> => {
    const userEntity = fakeDb[query.user_id];

    if (!userEntity) {
      return Promise.reject(new Error('user not found. abort update'));
    }
    Object.assign(userEntity, query);
    return Promise.resolve({ status: 'success', user: query });
  }
};
