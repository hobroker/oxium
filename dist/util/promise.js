"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = exports.ensurePromise = exports.toPromise = exports.promiseAll = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

const promiseAll = array => Promise.all(array);

exports.promiseAll = promiseAll;

const toPromise = value => Promise.resolve(value);

exports.toPromise = toPromise;
const ensurePromise = (0, _ramda.when)((0, _ramda.compose)(_ramda.not, _ramdaAdjunct.isPromise), toPromise);
exports.ensurePromise = ensurePromise;

const wait = ms => new Promise(r => setTimeout((0, _ramda.applyTo)(ms, r), ms));

exports.wait = wait;