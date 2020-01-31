"use strict";

exports.__esModule = true;
exports.setFeatureIsLoaded = exports.isFeatureLoaded = exports.updateHandler = exports.getHandler = exports.getId = exports.metaIsLoadedLens = exports.isLoadedLens = exports.metaLens = exports.handlerLens = exports.idLens = void 0;

var _ramda = require("ramda");

const idLens = (0, _ramda.lensProp)('id');
exports.idLens = idLens;
const handlerLens = (0, _ramda.lensProp)('handler');
exports.handlerLens = handlerLens;
const metaLens = (0, _ramda.lensProp)('_');
exports.metaLens = metaLens;
const isLoadedLens = (0, _ramda.lensProp)('isLoaded');
exports.isLoadedLens = isLoadedLens;
const metaIsLoadedLens = (0, _ramda.compose)(metaLens, isLoadedLens);
exports.metaIsLoadedLens = metaIsLoadedLens;
const getId = (0, _ramda.view)(idLens);
exports.getId = getId;
const getHandler = (0, _ramda.view)(handlerLens);
exports.getHandler = getHandler;
const updateHandler = (0, _ramda.over)(handlerLens);
exports.updateHandler = updateHandler;
const isFeatureLoaded = (0, _ramda.view)(metaIsLoadedLens);
exports.isFeatureLoaded = isFeatureLoaded;
const setFeatureIsLoaded = (0, _ramda.set)(metaIsLoadedLens);
exports.setFeatureIsLoaded = setFeatureIsLoaded;