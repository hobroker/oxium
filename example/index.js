import { applyTo, compose, take } from 'ramda';
import config from './config';
import { debugIt } from './lib/util/debug';
import { prepareFeatureHandlers, resolveHandlers } from './lib';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';

const features = [Demo, Mongo, Second];
const app = { config, features };

compose(
  resolveHandlers(take(2), applyTo(app)),
  prepareFeatureHandlers,
)(app).then(debugIt);
