"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _app = require("./lens/app");

var _util = require("./util");

const createAppRunner = (0, _ramda.curry)((filterFn, isDoneFn, app) => {
  const runAgainOrReturn = (0, _ramda.when)((0, _ramda.compose)(_ramda.not, isDoneFn), createAppRunner(filterFn, isDoneFn));
  return (0, _ramda.compose)((0, _ramda.then)((0, _ramda.compose)(runAgainOrReturn, (0, _app.replaceFeatures)(app))), _util.promiseAll, (0, _ramda.map)((0, _util.applyFeatureTo)(app)), filterFn, _app.getFeatures)(app);
});
var _default = createAppRunner;
exports.default = _default;