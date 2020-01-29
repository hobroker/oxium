"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callReader = void 0;

var _ramda = require("ramda");

var _monet = require("monet");

const callReader = (0, _ramda.compose)(_monet.Reader, _ramda.unapply, _ramda.apply, _ramda.identity);
exports.callReader = callReader;