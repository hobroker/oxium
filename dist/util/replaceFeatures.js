"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ramda = require("ramda");

var _app = require("../lens/app");

var _feature = require("../lens/feature");

var _constants = require("../constants");

const featureIdEq = (0, _ramda.compose)((0, _ramda.propEq)(_constants.ID), _feature.getId);
const findFeatureReplacement = (0, _ramda.curry)((newFeatures, feature) => (0, _ramda.compose)((0, _ramda.defaultTo)(feature), (0, _ramda.find)(featureIdEq(feature)))(newFeatures));
const replaceFeatures = (0, _ramda.curry)((app, features) => {
  const newFeatures = (0, _ramda.map)(findFeatureReplacement(features), (0, _app.getFeatures)(app));
  return (0, _app.setFeatures)(newFeatures, app);
});
var _default = replaceFeatures;
exports.default = _default;