"use strict";

exports.__esModule = true;
exports.default = void 0;

var _monet = require("monet");

var _ramda = require("ramda");

var _feature = require("../lens/feature");

var _async = require("../util/async");

var _either = require("../util/either");

const mapValidResult = (0, _ramda.compose)((0, _ramda.then)(_either.ensureEitherOrRight), _async.ensurePromise);
const mapInvalidResult = (0, _ramda.compose)(_monet.Left, (0, _ramda.defaultTo)(null));
const fnTransformation = (0, _ramda.curry)((validator, originalHandler) => (...args) => {
  const applyValidator = (0, _ramda.compose)(_async.ensurePromise, (0, _ramda.apply)(validator));
  return (0, _ramda.compose)((0, _ramda.then)((0, _ramda.ifElse)(_ramda.identity, (0, _ramda.compose)(mapValidResult, (0, _ramda.apply)(originalHandler), (0, _ramda.always)(args)), mapInvalidResult)), applyValidator)(args);
});
const deferHandler = (0, _ramda.useWith)(_feature.updateHandler, [fnTransformation, _ramda.identity]);
var _default = deferHandler;
exports.default = _default;