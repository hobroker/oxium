import { compose, converge, curry, forEach, identity, toPairs } from 'ramda';
import { isFunction, isNotFunction, isUndefined } from 'ramda-adjunct';
import { getWithProp, setProps } from '../selectors/feature';
import { getFeatures } from '../selectors/params';
import { shouldAddToProps } from './app';
import { debugIt } from './debug';

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
    const data = getWithProp(key, feature);
    const evalResult = evaluate(evaluator, data);
    if (isFunction(evalResult)) {
      debugIt('evalResult', evalResult(feature).props, feature.props);
    }

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
