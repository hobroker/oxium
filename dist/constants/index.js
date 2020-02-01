"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_LOADED = exports.HANDLER = exports.META = exports.FEATURES = exports.ID = exports.PKG_NAME = void 0;

var _package = require("../../package.json");

const PKG_NAME = _package.name;
exports.PKG_NAME = PKG_NAME;
const ID = 'id';
exports.ID = ID;
const HANDLER = 'handler';
exports.HANDLER = HANDLER;
const IS_LOADED = 'isLoaded';
exports.IS_LOADED = IS_LOADED;
const FEATURES = 'features';
exports.FEATURES = FEATURES;
const META = '_';
exports.META = META;