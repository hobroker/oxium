import { unless } from 'ramda';
import { isPromise } from 'ramda-adjunct';

export const promiseAll = array => Promise.all(array);

export const toPromise = value => Promise.resolve(value);

export const ensurePromise = unless(isPromise, toPromise);
