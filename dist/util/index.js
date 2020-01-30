"use strict";

exports.__esModule = true;
var _exportNames = {
  mapTo: true,
  applyFeatureTo: true
};
exports.applyFeatureTo = exports.mapTo = void 0;

var _benchmark = require("./benchmark");

Object.keys(_benchmark).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _benchmark[key];
});

var _debug = require("./debug");

Object.keys(_debug).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _debug[key];
});

var _either = require("./either");

Object.keys(_either).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _either[key];
});

var _noop = require("./noop");

Object.keys(_noop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _noop[key];
});

var _async = require("./async");

Object.keys(_async).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _async[key];
});

var _reader = require("./reader");

Object.keys(_reader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _reader[key];
});

var _mapTo = _interopRequireDefault(require("./mapTo"));

exports.mapTo = _mapTo.default;

var _applyFeatureTo = _interopRequireDefault(require("./applyFeatureTo"));

exports.applyFeatureTo = _applyFeatureTo.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }