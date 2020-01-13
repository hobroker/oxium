import { call, converge, curry, filter, identity, map } from 'ramda';
import { isFunction } from 'ramda-adjunct';

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

export const safe = fn => converge(identity, [identity, fn]);

export const logAndContinue = key =>
  safe(value => console.log(`log "${key}"=`, value));
