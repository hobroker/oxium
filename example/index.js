import { compose, converge, filter, map, take } from 'ramda';
import createAppRunner from '../src';
import { getFeatures, resetMetaToFeature } from '../src/lens/app';
import { areAllFeaturesLoaded } from '../src/lens/features';
import { getMeta, getWeave, isFeatureUnloaded } from '../src/lens/feature';
import { debugIt, debugItFp } from '../src/util';
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
  .then(compose(map(converge(debugItFp, [getMeta, getWeave])), getFeatures))
  .catch(debugIt);
