"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceObjIndexed = exports.assign = void 0;

var _ramda = require("ramda");

const assign = (0, _ramda.curry)((key, value, target) => {
  target[key] = value;
  return target;
});
exports.assign = assign;
const reduceObjIndexed = (0, _ramda.curry)((fn, acc, obj) => (0, _ramda.compose)((0, _ramda.reduce)((result, [key, value]) => fn(result, value, key, obj), acc), _ramda.toPairs)(obj));
exports.reduceObjIndexed = reduceObjIndexed;