import { compose, converge, curry, identity, reduce, toPairs } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';

export const assignOnce = curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const promiseAll = array => Promise.all(array);

export const ensurePromise = value => Promise.resolve(value);

export const safe = compose(converge(identity), appendFlipped([identity]));

export const noop = () => {};

export const wait = ms => new Promise(r => setTimeout(() => r(ms), ms));

export const reduceObjIndexed = curry((fn, acc, obj) =>
  compose(
    reduce((result, [key, value]) => fn(result, value, key, obj), acc),
    toPairs,
  )(obj),
);
