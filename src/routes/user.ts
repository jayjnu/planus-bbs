import { Router, Request, RequestHandler } from 'express';
import * as controller from '../user/user.controller';

const pipeToJSON: RequestHandler = (req, res, next) => {
  req.user$.subscribe(result => res.json(result), next);
};

type RouterOptions = {};

function createRouter(routerOptions?: RouterOptions) {
  const router = Router();

  router.get('/', controller.getUser, pipeToJSON);
  router.post('/', controller.addUser, pipeToJSON);
  router.put('/', controller.updateUser, pipeToJSON);
  router.delete('/', (req, res, next) => {});

  return router;
}

export default createRouter;
