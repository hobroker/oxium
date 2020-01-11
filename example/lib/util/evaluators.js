import assert from 'assert';
import { converge, curry, path, prop } from 'ramda';
import * as yup from 'yup';
import { getFeatureId } from '../selectors/feature';
import { hasFeature } from '.';

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
