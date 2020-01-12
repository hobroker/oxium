import { always, call, curry, filter, map } from 'ramda';
import { isFunction } from 'ramda-adjunct';

// helpers
export const lazy = fn => (...args) => always(fn(...args));

export const assignOnce = curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const callAll = map(call);

export const filterFunctions = filter(isFunction);

export const logAndContinue = value => {
  console.log('log value:', value);

  return value;
};
