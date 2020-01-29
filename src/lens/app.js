import {
  always,
  compose,
  converge,
  curry,
  identity,
  lensProp,
  map,
  set,
  useWith,
  view,
} from 'ramda';
import { findFeatureReplacement } from './features';
import { metaIsLoadedLens, setDefaultMeta } from './feature';
import { byIdLens } from '.';

export const featuresLens = lensProp('features');

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

export const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);

export const replaceFeaturesIn = curry((app, features) =>
  map(findFeatureReplacement(features), getFeatures(app)),
);

export const replaceFeatures = curry((app, features) => {
  const newFeatures = replaceFeaturesIn(app, features);

  return setFeatures(newFeatures, app);
});

export const resetMetaToFeature = useWith(setFeatures, [
  map(setDefaultMeta),
  identity,
]);
