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

const featuresLens = lensProp('features');

const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

const getFeatures = view(featuresLens);
const setFeatures = set(featuresLens);

const replaceFeaturesIn = curry((app, features) =>
  map(findFeatureReplacement(features), getFeatures(app)),
);

const replaceFeatures = curry((app, features) => {
  const newFeatures = replaceFeaturesIn(app, features);

  return setFeatures(newFeatures, app);
});

const resetMetaToFeature = useWith(setFeatures, [
  map(setDefaultMeta),
  identity,
]);

export { featuresLens, featureByIdLens, featureByIdIsLoadedLens };

export {
  getFeatures,
  setFeatures,
  replaceFeaturesIn,
  replaceFeatures,
  resetMetaToFeature,
};
