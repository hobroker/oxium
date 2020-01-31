import { compose, not, when } from 'ramda';
import { isPromise } from 'ramda-adjunct';

export const promiseAll = array => Promise.all(array);

export const toPromise = value => Promise.resolve(value);

export const ensurePromise = when(compose(not, isPromise), toPromise);
