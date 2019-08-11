import { Observable } from 'rxjs';

declare global {
  export namespace Express {
    export interface Request {
      query$: Observable<any>;
      body$: Observable<any>;
    }
  }
}
