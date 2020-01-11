import {
  assoc,
  call,
  compose,
  converge,
  curry,
  filter,
  identity,
  includes,
  map,
  path,
  prop,
  toPairs,
} from 'ramda';
import { isFunction, isNotUndefined } from 'ramda-adjunct';
import * as _ from 'lodash/fp';
import { getAllFeatureIds } from './params';
import { getHandler, getProps } from '../selectors/feature';

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

export const loadFeature = converge(lazy(call), [getHandler, getProps]);

export const callAll = map(call);

export const filterFunctions = filter(isFunction);

export const filterFeatures = filter(compose(isFunction, getHandler));

export const registerFeatures = compose(map(loadFeature), filterFeatures);

export const evaluateWith = curry((app, feature) => {
  const evaluators = compose(toPairs, prop('evaluators'))(app);
  const getData = key => path(['with', key], feature);
  const result = {};

  for (const [key, evaluator] of evaluators) {
    const data = getData(key);
    if (isFunction(evaluator) && isNotUndefined(data)) {
      result[key] = evaluator(data, { app, feature });
    }
  }

  return result;
});

export const evaluateAndAssocProps = app =>
  map(converge(assoc('props'), [evaluateWith(app), identity]));

export const hasFeature = curry((key, params) =>
  compose(includes(key), getAllFeatureIds)(params),
);
