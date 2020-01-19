import { compose, concat, curry, lensProp, set, values } from 'ramda';
import { getAppFeatureById } from '../../lib/selectors/params';
import { getPropsModels } from './selectors';
import { withLens } from '../../lib/selectors/feature';

const configLens = lensProp('models');
const withRequireLens = compose(withLens, configLens);

export const withModels = set(withRequireLens);

export const withModelsEvaluator = curry((models, params) => {
  const mongoFeature = getAppFeatureById(params);
  if (!mongoFeature.props.models) {
    mongoFeature.props.models = [];
  }

  mongoFeature.props.models = compose(
    concat(values(models)),
    getPropsModels,
  )(mongoFeature);

  return null;
});
