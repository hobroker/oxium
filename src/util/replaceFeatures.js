import { compose, curry, defaultTo, find, map, propEq } from 'ramda';
import { getFeatures, setFeatures } from '../lens/app';
import { getId } from '../lens/feature';

const featureIdEq = compose(propEq('id'), getId);

const findFeatureReplacement = curry((newFeatures, feature) => {
  const result = find(featureIdEq(feature), newFeatures);

  return defaultTo(feature, result);
});

const replaceFeatures = curry((app, features) => {
  const newFeatures = map(findFeatureReplacement(features), getFeatures(app));

  return setFeatures(newFeatures, app);
});

export default replaceFeatures;
