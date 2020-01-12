import { compose, converge, filter, lensProp, map, prop, view } from 'ramda';
import { isString } from 'ramda-adjunct';
import { getId, idLens } from './feature';

export const appLens = lensProp('app');
export const configLens = lensProp('config');
export const featureLens = lensProp('feature');
export const featuresLens = lensProp('features');

export const appConfigFeaturesLens = compose(appLens, configLens, featuresLens);
export const getAppConfigFeatures = view(appConfigFeaturesLens);

export const appFeaturesLens = compose(appLens, featuresLens);
export const getAppFeatures = view(appFeaturesLens);

export const featureIdLens = compose(featureLens, idLens);
export const getFeatureId = view(featureIdLens);

export const getFeatureConfig = converge(prop, [
  getFeatureId,
  getAppConfigFeatures,
]);

export const getAllFeatureIds = compose(
  filter(isString),
  map(getId),
  getAppFeatures,
);
