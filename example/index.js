import { pipe } from 'ramda';
import { callAll, filterFunctions, logAndContinue, safe } from './lib/util';
import { evaluateAndAssocProps, loadFeatures } from './lib/util/app';
import { withConfigEvaluator } from './lib/feature/withConfig';
import { withRequireFeatureEvaluator } from './lib/feature/withRequireFeature';
import { withModelsEvaluator } from './features/mongo/withModels';
import config from './config';
import Mongo from './features/mongo';
import Demo from './features/demo';
import { getFeatures } from './lib/selectors/params';

const evaluators = {
  config: withConfigEvaluator,
  require: withRequireFeatureEvaluator,
  models: withModelsEvaluator,
};

const features = [Mongo, Demo];

const app = { config, features, evaluators };

const run = pipe(
  evaluateAndAssocProps,
  safe(pipe(getFeatures, loadFeatures, callAll, filterFunctions, callAll)),
);

run(app);
