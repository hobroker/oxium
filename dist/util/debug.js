"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugItFp = exports.createDebug = exports.debugIt = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseDebug = (0, _debug.default)('app');
const debugIt = baseDebug;
exports.debugIt = debugIt;
const createDebug = (0, _ramda.compose)(_ramda.unapply, _ramda.apply, debugIt.extend.bind(debugIt));
exports.createDebug = createDebug;
const debugItFp = createDebug('fp');
exports.debugItFp = debugItFp;