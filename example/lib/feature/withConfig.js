import * as yup from 'yup';
import { compose, curry, lensProp, or, set } from 'ramda';
import { getFeatureConfig } from '../selectors/params';
import { propsLens, withLens } from '../selectors/feature';

const configLens = lensProp('config');
const withConfigLens = compose(withLens, configLens);
const propsConfigLens = compose(propsLens, configLens);

export const withConfig = set(withConfigLens);

export const setPropsConfig = set(propsConfigLens);

export const withConfigEvaluator = curry((configValidationSchema, params) => {
  const featuresConfig = getFeatureConfig(params);

  if (!configValidationSchema) {
    return or({}, featuresConfig);
  }

  const validationSchema = yup.object().shape(configValidationSchema);

  const config = validationSchema.validateSync(featuresConfig);

  return setPropsConfig(config);
});
