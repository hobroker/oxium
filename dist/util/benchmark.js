"use strict";

exports.__esModule = true;
exports.debugItTime = exports.measureTime = exports.hrTimeToMs = void 0;

var _ramda = require("ramda");

var _debug = require("./debug");

const hrTimeToMs = ([seconds, nanoseconds]) => Number(seconds * 1000 + nanoseconds / 10 ** 6);

exports.hrTimeToMs = hrTimeToMs;

const measureTime = () => (0, _ramda.compose)(hrTimeToMs, process.hrtime, (0, _ramda.always)(process.hrtime()));

exports.measureTime = measureTime;

const debugItTime = () => {
  const measure = measureTime();
  return () => {
    const ms = measure();
    (0, _debug.debugIt)(`${ms}ms`);
    return ms;
  };
};

exports.debugItTime = debugItTime;