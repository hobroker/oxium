import { compose, curry, includes, lensProp } from 'ramda';
import { getAllFeatureIds } from './params';

export const featuresLens = lensProp('features');

// export const

export const appHasFeature = curry((key, params) =>
  compose(includes(key), getAllFeatureIds)(params),
);

// export update
