import {
  all,
  always,
  compose,
  converge,
  identity,
  lensProp,
  pipe,
  set,
  view,
} from 'ramda';
import byIdLens from '../util/byIdLens';
import { FEATURES } from '../constants';
import { isFeatureLoaded, metaIsLoadedLens } from './feature';

export const featuresLens = lensProp(FEATURES);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

export const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

export const areAppFeaturesLoaded = pipe(getFeatures, all(isFeatureLoaded));
