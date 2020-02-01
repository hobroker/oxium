"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePromise = exports.toPromise = exports.promiseAll = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

const promiseAll = array => Promise.all(array);

exports.promiseAll = promiseAll;

const toPromise = value => Promise.resolve(value);

exports.toPromise = toPromise;
const ensurePromise = (0, _ramda.unless)(_ramdaAdjunct.isPromise, toPromise);
exports.ensurePromise = ensurePromise;