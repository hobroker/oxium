import * as yup from 'yup';
import { curry, or } from 'ramda';
import { getFeatureConfig } from '../selectors/params';
import { assocWith } from '.';

const withConfig = assocWith('config');

const withConfigEvaluator = curry((configValidationSchema, params) => {
  const featuresConfig = getFeatureConfig(params);

  if (!configValidationSchema) {
    return or({}, featuresConfig);
  }

  const validationSchema = yup.object().shape(configValidationSchema);

  return validationSchema.validateSync(featuresConfig);
});

export { withConfig, withConfigEvaluator };
