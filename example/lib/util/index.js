import {
  append,
  call,
  compose,
  converge,
  curry,
  filter,
  identity,
  map,
} from 'ramda';
import { isFunction, appendFlipped } from 'ramda-adjunct';
import { debugIt } from './debug';

export const assignOnce = curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const callAll = map(call);

export const promiseAll = array => Promise.all(array);

export const applyToLater = curry((args, f) => () => f(...args));

export const filterFunctions = filter(isFunction);

/**
 * @deprecated
 */
export const safe = compose(converge(identity), appendFlipped([identity]));

export const measureTime = () => {
  const hrstart = process.hrtime();

  return () => {
    const hrend = process.hrtime(hrstart);
    const [seconds, nanoseconds] = hrend;

    return Number(seconds * 1000 + nanoseconds / 10 ** 6);
  };
};
