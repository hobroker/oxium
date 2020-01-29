"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _promise = require("./promise");

const resolveInChunks = (0, _ramda.curryN)(2, (0, _ramda.compose)((0, _ramda.reduce)((p, chunk) => p.then(() => (0, _ramda.compose)(_promise.promiseAll, (0, _ramda.map)(_ramda.call))(chunk)), Promise.resolve()), _ramda.splitEvery));
var _default = resolveInChunks;
exports.default = _default;