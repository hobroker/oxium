import { always, compose, converge, lensProp, nthArg, set, view } from 'ramda';
import { metaIsLoadedLens } from './feature';
import { byIdLens } from '.';

export const featuresLens = lensProp('features');

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, nthArg(0)),
]);

export const featureMetaIsLoadedLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, nthArg(0)),
  always(metaIsLoadedLens),
]);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);
