import { all, compose, curry, defaultTo, find } from 'ramda';
import { featureIdEq, isFeatureLoaded } from './feature';

export const areAllFeaturesLoaded = all(isFeatureLoaded);

export const findFeatureReplacement = curry((newFeatures, feature) =>
  compose(defaultTo(feature), find(featureIdEq(feature)))(newFeatures),
);
