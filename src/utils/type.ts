import { ifElse, curry, isNil } from 'ramda';

export const ifNill = curry(ifElse)(isNil);
