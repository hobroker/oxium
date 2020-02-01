"use strict";

exports.__esModule = true;
exports.debugItFp = exports.debugIt = exports.createDebug = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _ramda = require("ramda");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseDebug = (0, _debug.default)(_constants.PKG_NAME);
const debugIt = baseDebug;
exports.debugIt = debugIt;
const createDebug = (0, _ramda.compose)(_ramda.unapply, _ramda.apply, debugIt.extend.bind(debugIt));
exports.createDebug = createDebug;
const debugItFp = (0, _ramda.tap)(createDebug('fp'));
exports.debugItFp = debugItFp;