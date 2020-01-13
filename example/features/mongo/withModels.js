import { compose, concat, curry, values } from 'ramda';
import { assocWith } from '../../lib/feature';
import { getAppFeatureById } from '../../lib/selectors/params';
import { getPropsModels } from './mongo-selectors';

const withModels = assocWith('models');

const withModelsEvaluator = curry((models, params) => {
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

export { withModels, withModelsEvaluator };
