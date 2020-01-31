"use strict";

exports.__esModule = true;
exports.setFeatures = exports.getFeatures = exports.featuresLens = void 0;

var _ramda = require("ramda");

const featuresLens = (0, _ramda.lensProp)('features');
exports.featuresLens = featuresLens;
const getFeatures = (0, _ramda.view)(featuresLens);
exports.getFeatures = getFeatures;
const setFeatures = (0, _ramda.set)(featuresLens);
exports.setFeatures = setFeatures;