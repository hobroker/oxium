import {
  allPass,
  call,
  compose,
  converge,
  curry,
  filter,
  identity,
  map,
  toPairs,
} from 'ramda';
import {
  isFunction,
  isNotFunction,
  isNotNull,
  isNotUndefined,
  isUndefined,
} from 'ramda-adjunct';
import { getHandler, getProps, setProps } from '../selectors/feature';
import { getWith } from '../feature';
import { lazy } from '.';

export const filterFeaturesByHandler = filter(compose(isFunction, getHandler));

export const loadFeature = converge(lazy(call), [getHandler, getProps]);

export const loadFeatures = compose(map(loadFeature), filterFeaturesByHandler);

export const shouldAddToProps = allPass([isNotUndefined, isNotNull]);

const evaluateEvaluator = curry((params, evaluator, data) => {
  if (isNotFunction(evaluator) || isUndefined(data)) {
    return null;
  }

  return evaluator(data, params);
});

export const evaluateWith = curry((app, feature) => {
  const result = {};
  const params = { app, feature };
  const evaluate = evaluateEvaluator(params);
  const evaluators = toPairs(app.evaluators);

  for (const [key, evaluator] of evaluators) {
    const data = getWith(key, feature);
    const evalResult = evaluate(evaluator, data);
    if (shouldAddToProps(evalResult)) {
      result[key] = evalResult;
    }
  }

  return result;
});

export const evaluateAndAssocProps = app =>
  map(converge(setProps, [evaluateWith(app), identity]));
