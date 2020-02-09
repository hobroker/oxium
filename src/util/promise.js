import { andThen, pipe, unless } from 'ramda';
import { allP, isPromise } from 'ramda-adjunct';

export const toPromise = value => Promise.resolve(value);

export const ensurePromise = unless(isPromise, toPromise);

export const promiseAllAndThen = fn => pipe(allP, andThen(fn));
