import {
  applyTo,
  compose,
  curry,
  identity,
  not,
  reduce,
  then,
  toPairs,
  useWith,
  when,
} from 'ramda';
import { isPromise } from 'ramda-adjunct';

export const assign = curry((key, value, target) => {
  target[key] = value;

  return target;
});

export const promiseAll = array => Promise.all(array);

export const toPromise = value => Promise.resolve(value);

export const ensurePromise = when(compose(not, isPromise), toPromise);

export const noop = () => {};

export const wait = ms => new Promise(r => setTimeout(applyTo(ms, r), ms));

export const reduceObjIndexed = curry((fn, acc, obj) =>
  compose(
    reduce((result, [key, value]) => fn(result, value, key, obj), acc),
    toPairs,
  )(obj),
);

export const thenApplyTo = useWith(then, [applyTo, identity]);
