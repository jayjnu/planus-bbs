import * as controller from './user.controller';
import * as model from './user.model';
import * as errors from './user.errors';
import * as converter from './user.converter';
import * as interfaces from './user.interfaces';

const user = {
  controller,
  model,
  errors,
  converter,
  interfaces
};

export default user;
