import { pipe } from 'ramda';
import Mongo from './features/mongo';
import Demo from './features/demo';
import {
  registerFeatures,
  filterFunctions,
  callAll,
  evaluateAndAssocProps,
} from './lib/util';
import config from './config';
import { configEvaluator, requireEvaluator } from './lib/util/evaluators';

const evaluators = {
  config: configEvaluator,
  require: requireEvaluator,
};

const features = [Mongo, Demo];

const app = { features, config, evaluators };

const run = pipe(
  evaluateAndAssocProps(app),
  registerFeatures,
  callAll,
  filterFunctions,
  callAll,
);

run(features);
