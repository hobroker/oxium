import { compose, filter, map, take } from 'ramda';
import { getFeatures, resetMetaToFeature } from '../src/lens/app';
import { areAllFeaturesLoaded } from '../src/lens/features';
import { getMeta, isFeatureUnloaded } from '../src/lens/feature';
import { debugIt, debugItFp } from '../src/util/debug';
import createAppRunner from '../src';
import config from './config';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';

const features = [Demo, Mongo, Second];
const app = resetMetaToFeature(features, { config });

const filterFn = compose(take(2), filter(isFeatureUnloaded));
const isDoneFn = compose(areAllFeaturesLoaded, getFeatures);
const run = createAppRunner(filterFn, isDoneFn);

run(app)
  .then(compose(map(compose(debugItFp, getMeta)), getFeatures))
  .catch(debugIt);
