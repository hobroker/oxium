"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _feature = require("../lens/feature");

var _either = require("./either");

var _promise = require("./promise");

const rightResultMap = (0, _ramda.converge)(_ramda.compose, [(0, _ramda.always)((0, _feature.setFeatureIsLoaded)(true)), (0, _ramda.ifElse)(_ramdaAdjunct.isFunction, _ramda.identity, (0, _ramda.always)(_ramda.identity))]);
const leftResultMap = (0, _ramda.always)(_ramda.identity);
const resolveHandler = (0, _ramda.curry)((app, handler) => (0, _ramda.compose)((0, _ramda.then)(_either.ensureEitherOrRight), _promise.ensurePromise, handler)(app));
const callFeatureWith = (0, _ramda.curry)((app, feature) => (0, _ramda.compose)(resolveHandler(app), _feature.getHandler)(feature));
const foldHandlerResult = (0, _ramda.useWith)(_ramda.apply, [(0, _ramdaAdjunct.cata)(leftResultMap, rightResultMap), _ramdaAdjunct.ensureArray]);
const applyFeatureTo = (0, _ramda.curry)((app, feature) => callFeatureWith(app, feature).then(foldHandlerResult).then((0, _ramda.applyTo)(feature)));
var _default = applyFeatureTo;
exports.default = _default;