import { Router, Request } from 'express';
import * as userController from '../user/user.controller';

type RouterOptions = {};

function createRouter(routerOptions?: RouterOptions) {
  const router = Router();

  router.get('/', userController.getUser);
  router.post('/', userController.addUser);
  router.put('/', (req, res, next) => {});
  router.delete('/', (req, res, next) => {});

  return router;
}

export default createRouter;
