import { compose, filter, map, take } from 'ramda';
import { getFeatures } from '../src/selectors/app';
import { areAllFeaturesLoaded } from '../src/selectors/features';
import {
  getMeta,
  isFeatureUnloaded,
  setDefaultMeta,
} from '../src/selectors/feature';
import { debugItFp } from '../src/util/debug';
import { createAppRunner } from '../src';
import config from './config';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';

const features = [Demo, Mongo, Second];
const app = {
  config,
  features: map(setDefaultMeta, features),
};

const filterFn = compose(take(2), filter(isFeatureUnloaded));
const isDoneFn = compose(areAllFeaturesLoaded, getFeatures);
const run = createAppRunner(filterFn, isDoneFn);

run(app).then(compose(map(compose(debugItFp, getMeta)), getFeatures));
