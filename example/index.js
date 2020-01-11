import { pipe } from 'ramda';
import { filterFunctions, callAll} from './lib/util';
import { configEvaluator, evaluateAndAssocProps, requireEvaluator } from './lib/util/evaluators';
import { loadFeatures } from './lib/util/app';
import config from './config';
import Mongo from './features/mongo';
import Demo from './features/demo';

const evaluators = {
  config: configEvaluator,
  require: requireEvaluator,
};

const features = [Mongo, Demo];

const app = { features, config, evaluators };

const run = pipe(
  evaluateAndAssocProps(app),
  loadFeatures,
  callAll,
  filterFunctions,
  callAll,
);

run(features);
