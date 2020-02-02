import { compose, curry, defaultTo, find, map, propEq } from 'ramda';
import { getFeatures, setFeatures } from '../lens/app';
import { getId } from '../lens/feature';
import { ID } from '../constants';

const featureIdEq = x => compose(propEq(ID), getId)(x);

const findFeatureReplacement = curry((newFeatures, feature) =>
  compose(defaultTo(feature), find(featureIdEq(feature)))(newFeatures),
);

const replaceFeaturesIn = curry((app, features) => {
  const newFeatures = map(findFeatureReplacement(features), getFeatures(app));

  return setFeatures(newFeatures, app);
});

export default replaceFeaturesIn;
