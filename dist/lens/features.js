"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findFeatureReplacement = exports.areAllFeaturesLoaded = void 0;

var _ramda = require("ramda");

var _feature = require("./feature");

const areAllFeaturesLoaded = (0, _ramda.all)(_feature.isFeatureLoaded);
exports.areAllFeaturesLoaded = areAllFeaturesLoaded;
const findFeatureReplacement = (0, _ramda.curry)((newFeatures, feature) => {
  const result = (0, _ramda.find)((0, _feature.featureIdEq)(feature), newFeatures);
  return (0, _ramda.defaultTo)(feature, result);
});
exports.findFeatureReplacement = findFeatureReplacement;