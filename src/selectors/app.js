import {
  always,
  compose,
  converge,
  identity,
  lensProp,
  map,
  nthArg,
  set,
  useWith,
  view,
} from 'ramda';
import { metaIsLoadedLens } from './feature';
import { findFeatureReplacement } from './features';
import { byIdLens } from '.';

export const featuresLens = lensProp('features');

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

export const featureMetaIsLoadedLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
  always(metaIsLoadedLens),
]);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);

export const replaceFeaturesIn = converge(map, [
  compose(findFeatureReplacement, nthArg(1)),
  identity,
]);

export const replaceFeatures = converge(setFeatures, [
  useWith(replaceFeaturesIn, [getFeatures, identity]),
  identity,
]);
