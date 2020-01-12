import { pipe } from 'ramda';
import { filterFunctions, callAll } from './lib/util';
import { evaluateAndAssocProps, loadFeatures } from './lib/util/app';
import { withConfigEvaluator } from './lib/feature/withConfig';
import { withRequireFeatureEvaluator } from './lib/feature/withRequireFeature';
import config from './config';
import Mongo from './features/mongo';
import Demo from './features/demo';

const evaluators = {
  config: withConfigEvaluator,
  require: withRequireFeatureEvaluator,
};

const features = [Mongo, Demo];

const app = { config, features, evaluators };

const run = pipe(
  evaluateAndAssocProps(app),
  loadFeatures,
  callAll,
  filterFunctions,
  callAll,
);

run(features);
