"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFeaturesLens = exports.featuresLens = exports.configLens = void 0;

var _ramda = require("ramda");

const configLens = (0, _ramda.lensProp)('config');
exports.configLens = configLens;
const featuresLens = (0, _ramda.lensProp)('features');
exports.featuresLens = featuresLens;
const configFeaturesLens = (0, _ramda.compose)(configLens, featuresLens);
exports.configFeaturesLens = configFeaturesLens;