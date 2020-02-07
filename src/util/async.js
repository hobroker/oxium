import { compose, is, then, unless } from 'ramda';
import { allP } from 'ramda-adjunct';

export const toPromise = value => Promise.resolve(value);

export const ensurePromise = unless(is(Promise), toPromise);

export const promiseAllThen = fn => compose(then(fn), allP);
