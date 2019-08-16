import { Router, Request, RequestHandler } from 'express';
import user from '../modules/user';

const pipeToJSON: RequestHandler = (req, res, next) => {
  req.user$.subscribe(result => res.json(result), next);
};

type RouterOptions = {};

function createRouter(routerOptions?: RouterOptions) {
  const router = Router();

  router.get('/', user.controller.getUser, pipeToJSON);
  router.post('/', user.controller.addUser, pipeToJSON);
  router.put('/', user.controller.updateUser, pipeToJSON);
  router.delete('/', (req, res, next) => {});

  return router;
}

export default createRouter;
