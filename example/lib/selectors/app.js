import { compose, curry, includes } from 'ramda';
import { getAllFeatureIds } from './params';

export const appHasFeature = curry((key, params) =>
  compose(includes(key), getAllFeatureIds)(params),
);
