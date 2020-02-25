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
import findByPropLens from '../util/findByPropLens';
import { FEATURES, ID } from '../constants';
import { isFeatureLoaded, metaIsLoadedLens } from './feature';

export const createByIdLens = findByPropLens(ID);

export const featuresLens = lensProp(FEATURES);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(createByIdLens, identity),
]);

export const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

export const areAppFeaturesLoaded = pipe(getFeatures, all(isFeatureLoaded));
