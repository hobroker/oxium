import { compose, filter, map, take } from 'ramda';
import config from './config';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';
import { getFeatures } from '../src/selectors/app';
import { isFeatureUnloaded, setDefaultMeta } from '../src/selectors/feature';
import { areAllFeaturesLoaded } from '../src/selectors/features';
import { runApp } from '../src';

const features = [Demo, Mongo, Second];
const app = {
  config,
  features: map(setDefaultMeta, features),
};

const filterFn = compose(take(2), filter(isFeatureUnloaded));
const isDoneFn = compose(areAllFeaturesLoaded, getFeatures);
const run = runApp(filterFn, isDoneFn);

run(app);
