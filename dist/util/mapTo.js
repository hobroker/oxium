"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _object = require("./object");

const findTransformer = recursiveFn => (0, _ramda.cond)([[_ramdaAdjunct.isFunction, _ramda.identity], [_ramdaAdjunct.isObject, recursiveFn], [_ramdaAdjunct.isString, _ramda.prop], [_ramda.T, _ramda.always]]);

const mapTo = (0, _ramda.curry)((spec, object) => (0, _object.reduceObjIndexed)((0, _ramda.converge)(_ramda.assoc, [(0, _ramda.nthArg)(2), (0, _ramda.compose)((0, _ramda.applyTo)(object), findTransformer(mapTo), (0, _ramda.nthArg)(1)), (0, _ramda.nthArg)(0)]), (0, _ramdaAdjunct.stubObj)(), spec));
var _default = mapTo;
exports.default = _default;