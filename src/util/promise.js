import { andThen, pipe, unless } from 'ramda';
import { allP, isPromise, resolveP } from 'ramda-adjunct';

export const ensurePromise = unless(isPromise, resolveP);

export const promiseAllAndThen = fn => pipe(allP, andThen(fn));
