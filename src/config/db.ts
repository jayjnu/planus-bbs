import { ConnectionOptions } from 'mongoose';

export const dbURL = 'mongodb://localhost:27017/planus_test';
export const options: ConnectionOptions = {
  useNewUrlParser: true
};
