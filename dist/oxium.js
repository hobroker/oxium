"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _app = require("./lens/app");

var _async = require("./util/async");

var _applyFeatureTo = _interopRequireDefault(require("./util/applyFeatureTo"));

var _replaceFeaturesIn = _interopRequireDefault(require("./util/replaceFeaturesIn"));

const createAppRunner = (0, _ramda.curry)((filterFn, isDoneFn, app) => {
  const runAgainOrReturn = (0, _ramda.when)((0, _ramda.compose)(_ramda.not, isDoneFn), createAppRunner(filterFn, isDoneFn));
  return (0, _ramda.compose)((0, _ramda.then)((0, _ramda.compose)(runAgainOrReturn, (0, _replaceFeaturesIn.default)(app))), _async.promiseAll, (0, _ramda.map)((0, _applyFeatureTo.default)(app)), filterFn, _app.getFeatures)(app);
});
var _default = createAppRunner;
exports.default = _default;