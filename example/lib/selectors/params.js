import {
  always,
  compose,
  converge,
  filter,
  lensProp,
  map,
  nthArg,
  prop,
  set,
  view,
} from 'ramda';
import { isString } from 'ramda-adjunct';
import { getId, idLens } from './feature';
import { byIdLens } from './index';

export const appLens = lensProp('app');
export const configLens = lensProp('config');
export const featureLens = lensProp('feature');
export const featuresLens = lensProp('features');

export const getConfig = view(configLens);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);

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

export const appFeatureByIdLens = converge(compose, [
  always(appLens),
  always(featuresLens),
  compose(byIdLens, nthArg(0)),
]);

export const getAppFeatureById = params =>
  view(appFeatureByIdLens('mongo'), params);
