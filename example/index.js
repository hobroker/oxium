import { applyTo, compose, filter, map, mergeRight, not, take } from 'ramda';
import { noop } from 'rxjs';
import config from './config';
import { attachDefaultMeta, resolveHandlers } from './lib';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';
import { getFeatures } from './lib/selectors/app';
import { isFeatureLoaded } from './lib/selectors/feature';

const features = [Demo, Second, Mongo];
const app = {
  config,
  features: map(attachDefaultMeta, features),
};

const takeFn = compose(take(2), filter(compose(not, isFeatureLoaded)));

compose(
  resolveHandlers(takeFn, compose(applyTo, mergeRight(app))),
  getFeatures,
)(app).then(noop);
