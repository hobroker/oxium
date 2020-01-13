import {
  allPass,
  always,
  apply,
  compose,
  converge,
  curry,
  filter,
  forEach,
  identity,
  juxt,
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
import { getFeatures } from '../selectors/params';

export const filterFeaturesByHandler = filter(compose(isFunction, getHandler));

export const getHandlerArgs = juxt([getProps, always(1)]);

export const loadFeature = converge(compose(always, apply), [
  getHandler,
  getHandlerArgs,
]);

export const loadFeatures = compose(map(loadFeature), filterFeaturesByHandler);

export const shouldAddToProps = allPass([isNotUndefined, isNotNull]);

const evaluateEvaluator = curry((params, evaluator, data) => {
  if (isNotFunction(evaluator) || isUndefined(data)) {
    return null;
  }

  return evaluator(data, params);
});

export const evaluateWith = curry((app, feature) => {
  feature.props = {};
  const params = { app, feature };
  const evaluate = evaluateEvaluator(params);
  const evaluators = toPairs(app.evaluators);

  for (const [key, evaluator] of evaluators) {
    const data = getWith(key, feature);
    const evalResult = evaluate(evaluator, data);

    if (shouldAddToProps(evalResult)) {
      feature.props[key] = evalResult;
    }
  }
});

export const evaluateAndAssocProps = app => {
  const evaluate = evaluateWith(app);
  const evaluateAndSet = converge(setProps, [evaluate, identity]);
  const evaluateFeatures = compose(forEach(evaluateAndSet), getFeatures);
  evaluateFeatures(app);

  return app;
};
