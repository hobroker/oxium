import { call, filter, map } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import * as _ from 'lodash/fp';

// helpers
export const lazy = fn => (...args) => () => fn(...args);

export const assignOnce = _.curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const callAll = map(call);

export const filterFunctions = filter(isFunction);

