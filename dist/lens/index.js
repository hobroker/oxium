"use strict";

exports.__esModule = true;
exports.byIdLens = void 0;

var _ramda = require("ramda");

const createFindByPropLens = (0, _ramda.curry)((propName, propValue) => (0, _ramda.lens)((0, _ramda.find)((0, _ramda.propEq)(propName, propValue)), (val, arr) => {
  const index = (0, _ramda.findIndex)((0, _ramda.propEq)(propName, propValue), arr);
  const replaceIndex = index > -1 ? index : arr.length;
  return (0, _ramda.update)(replaceIndex, val, arr);
}));
const byIdLens = createFindByPropLens('id');
exports.byIdLens = byIdLens;