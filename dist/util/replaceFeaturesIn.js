"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _app = require("../lens/app");

var _feature = require("../lens/feature");

var _constants = require("../constants");

const featureIdEq = (0, _ramda.compose)((0, _ramda.propEq)(_constants.ID), _feature.getId);
const findFeatureReplacement = (0, _ramda.curry)((newFeatures, feature) => (0, _ramda.compose)((0, _ramda.defaultTo)(feature), (0, _ramda.find)(featureIdEq(feature)))(newFeatures));
const replaceFeaturesIn = (0, _ramda.curry)((app, features) => {
  const newFeatures = (0, _ramda.map)(findFeatureReplacement(features), (0, _app.getFeatures)(app));
  return (0, _app.setFeatures)(newFeatures, app);
});
var _default = replaceFeaturesIn;
exports.default = _default;