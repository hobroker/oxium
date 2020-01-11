import assert from 'assert';
import {
  assoc,
  compose,
  converge,
  curry,
  identity,
  map,
  path,
  prop,
  toPairs,
} from 'ramda';
import * as yup from 'yup';
import { isFunction, isNotUndefined } from 'ramda-adjunct';
import { getFeatureId } from '../selectors/feature';
import { hasFeature } from './app';

export const configEvaluator = curry((configValidationSchema, params) => {
  if (!configValidationSchema) {
    return {};
  }

  const featuresConfig = converge(prop, [
    path(['feature', 'id']),
    path(['app', 'config', 'features']),
  ])(params);

  const validationSchema = yup.object().shape(configValidationSchema);

  return validationSchema.validateSync(featuresConfig);
});

export const requireEvaluator = curry((key, params) => {
  const id = getFeatureId(params.feature);

  assert(
    hasFeature(key, params),
    `feature "${key}" is required by feature "${id}"`,
  );
});

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
