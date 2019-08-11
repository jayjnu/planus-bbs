import { RequestHandler } from 'express';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

function rexify(options?: any): RequestHandler {
  return (req, res, next) => {
    req.query$ = of(req.query).pipe(first());
    req.body$ = of(req.body).pipe(first());

    next();
  };
}

export default rexify;
