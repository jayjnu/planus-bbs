import { Router, Request } from 'express';
import * as controller from '../user/user.controller';

type RouterOptions = {};

function createRouter(routerOptions?: RouterOptions) {
  const router = Router();

  router.get('/', controller.getUser);
  router.post('/', controller.addUser);
  router.put('/', controller.updateUser);
  router.delete('/', (req, res, next) => {});

  return router;
}

export default createRouter;
