import { compose, filter, map, path } from 'ramda';
import { isString } from 'ramda-adjunct';
import { getFeatureId } from '../selectors/feature';

export const getAllFeatureIds = compose(
  filter(isString),
  map(getFeatureId),
  path(['app', 'features']),
);
