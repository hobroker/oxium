import * as yup from 'yup';
import { compose, curry, lensProp, or, set } from 'ramda';
import { getFeatureConfig } from '../selectors/params';
import { propsLens } from '../selectors/feature';

const configLens = lensProp('config');
const propsConfigLens = compose(propsLens, configLens);

export const setPropsConfig = set(propsConfigLens);

export const withConfig2Evaluator = curry((configValidationSchema, params) => {
  const featuresConfig = getFeatureConfig(params);

  if (!configValidationSchema) {
    return or({}, featuresConfig);
  }

  const validationSchema = yup.object().shape(configValidationSchema);

  const config = validationSchema.validateSync(featuresConfig);

  return setPropsConfig(config);
});

export const withConfig2 = curry((meta, feature) => {
  feature.with.set(withConfig2Evaluator, meta);
});
