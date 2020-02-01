"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureEitherOrRight = exports.ensureEitherOr = exports.isNotEither = exports.isEither = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _monet = require("monet");

const isEither = (0, _ramda.allPass)([_ramdaAdjunct.isNotUndefined, _monet.Either.isOfType]);
exports.isEither = isEither;
const isNotEither = (0, _ramda.compose)(_ramda.not, isEither);
exports.isNotEither = isNotEither;
const ensureEitherOr = (0, _ramda.when)(isNotEither);
exports.ensureEitherOr = ensureEitherOr;
const ensureEitherOrRight = ensureEitherOr(_monet.Right);
exports.ensureEitherOrRight = ensureEitherOrRight;