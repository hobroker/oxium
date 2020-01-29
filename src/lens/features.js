import { all, curry, defaultTo, find } from 'ramda';
import { featureIdEq, isFeatureLoaded } from './feature';

export const areAllFeaturesLoaded = all(isFeatureLoaded);

export const findFeatureReplacement = curry((newFeatures, feature) => {
  const result = find(featureIdEq(feature), newFeatures);

  return defaultTo(feature, result);
});
