"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetMetaToFeature = exports.replaceFeatures = exports.replaceFeaturesIn = exports.setFeatures = exports.getFeatures = exports.featureByIdIsLoadedLens = exports.featureByIdLens = exports.featuresLens = void 0;

var _ramda = require("ramda");

var _features = require("./features");

var _feature = require("./feature");

var _ = require(".");

const featuresLens = (0, _ramda.lensProp)('features');
exports.featuresLens = featuresLens;
const featureByIdLens = (0, _ramda.converge)(_ramda.compose, [(0, _ramda.always)(featuresLens), (0, _ramda.compose)(_.byIdLens, _ramda.identity)]);
exports.featureByIdLens = featureByIdLens;
const featureByIdIsLoadedLens = (0, _ramda.converge)(_ramda.compose, [featureByIdLens, (0, _ramda.always)(_feature.metaIsLoadedLens)]);
exports.featureByIdIsLoadedLens = featureByIdIsLoadedLens;
const getFeatures = (0, _ramda.view)(featuresLens);
exports.getFeatures = getFeatures;
const setFeatures = (0, _ramda.set)(featuresLens);
exports.setFeatures = setFeatures;
const replaceFeaturesIn = (0, _ramda.curry)((app, features) => (0, _ramda.map)((0, _features.findFeatureReplacement)(features), getFeatures(app)));
exports.replaceFeaturesIn = replaceFeaturesIn;
const replaceFeatures = (0, _ramda.curry)((app, features) => {
  const newFeatures = replaceFeaturesIn(app, features);
  return setFeatures(newFeatures, app);
});
exports.replaceFeatures = replaceFeatures;
const resetMetaToFeature = (0, _ramda.useWith)(setFeatures, [(0, _ramda.map)(_feature.setDefaultMeta), _ramda.identity]);
exports.resetMetaToFeature = resetMetaToFeature;