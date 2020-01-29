"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _monet = require("monet");

var _ramda = require("ramda");

var _util = require("../util");

var _feature = require("../lens/feature");

const handlerTransformation = (0, _ramda.curry)((validator, originalHandler) => (...args) => (0, _ramda.compose)((0, _ramda.then)((0, _ramda.ifElse)(_ramda.identity, (0, _ramda.compose)((0, _ramda.then)(_monet.Right), _util.ensurePromise, (0, _ramda.apply)(originalHandler), (0, _ramda.always)(args)), (0, _ramda.compose)(_monet.Left, (0, _ramda.always)(null)))), _util.ensurePromise, (0, _ramda.apply)(validator))(args));
const deferHandler = (0, _ramda.useWith)(_feature.updateHandler, [handlerTransformation, _ramda.identity]);
var _default = deferHandler;
exports.default = _default;