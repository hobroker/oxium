"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _feature = require("../lens/feature");

var _either = require("./either");

var _async = require("./async");

const mapRightResult = (0, _ramda.converge)(_ramda.compose, [(0, _ramda.always)((0, _feature.setFeatureIsLoaded)(true)), (0, _ramda.ifElse)(_ramdaAdjunct.isFunction, _ramda.identity, (0, _ramda.always)(_ramda.identity))]);
const mapLeftResult = (0, _ramda.always)(_ramda.identity);
const resolveHandler = (0, _ramda.curry)((app, handler) => (0, _ramda.compose)((0, _ramda.then)(_either.ensureEitherOrRight), _async.ensurePromise, handler)(app));
const callFeatureWith = (0, _ramda.curry)((app, feature) => (0, _ramda.compose)(resolveHandler(app), _feature.getHandler)(feature));
const applyFeatureTo = (0, _ramda.curry)((app, feature) => (0, _ramda.compose)((0, _ramda.then)((0, _ramda.applyTo)(feature)), (0, _ramda.then)((0, _ramdaAdjunct.cata)(mapLeftResult, mapRightResult)), callFeatureWith)(app, feature));
var _default = applyFeatureTo;
exports.default = _default;