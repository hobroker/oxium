"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featureIdEq = exports.setDefaultMeta = exports.setHandlerResult = exports.setFeatureIsLoaded = exports.isFeatureUnloaded = exports.isFeatureLoaded = exports.getMeta = exports.getDefaultWeave = exports.setDefaultWeave = exports.getWeave = exports.updateHandler = exports.getHandler = exports.getId = exports.sharedLens = exports.metaResultLens = exports.metaIsLoadedLens = exports.resultLens = exports.isLoadedLens = exports.metaLens = exports.defaultWeaveLens = exports.weaveLens = exports.defaultLens = exports.handlerLens = exports.idLens = void 0;

var _ramda = require("ramda");

const idLens = (0, _ramda.lensProp)('id');
exports.idLens = idLens;
const handlerLens = (0, _ramda.lensProp)('handler');
exports.handlerLens = handlerLens;
const defaultLens = (0, _ramda.lensProp)('default');
exports.defaultLens = defaultLens;
const weaveLens = (0, _ramda.lensProp)('weave');
exports.weaveLens = weaveLens;
const defaultWeaveLens = (0, _ramda.compose)(weaveLens, defaultLens);
exports.defaultWeaveLens = defaultWeaveLens;
const metaLens = (0, _ramda.lensProp)('_');
exports.metaLens = metaLens;
const isLoadedLens = (0, _ramda.lensProp)('isLoaded');
exports.isLoadedLens = isLoadedLens;
const resultLens = (0, _ramda.lensProp)('result');
exports.resultLens = resultLens;
const metaIsLoadedLens = (0, _ramda.compose)(metaLens, isLoadedLens);
exports.metaIsLoadedLens = metaIsLoadedLens;
const metaResultLens = (0, _ramda.compose)(metaLens, resultLens);
exports.metaResultLens = metaResultLens;
const sharedLens = (0, _ramda.lensProp)('shared');
exports.sharedLens = sharedLens;
const getId = (0, _ramda.view)(idLens);
exports.getId = getId;
const getHandler = (0, _ramda.view)(handlerLens);
exports.getHandler = getHandler;
const updateHandler = (0, _ramda.over)(handlerLens);
exports.updateHandler = updateHandler;
const getWeave = (0, _ramda.view)(weaveLens);
exports.getWeave = getWeave;
const setDefaultWeave = (0, _ramda.set)(defaultWeaveLens);
exports.setDefaultWeave = setDefaultWeave;
const getDefaultWeave = (0, _ramda.view)(defaultWeaveLens);
exports.getDefaultWeave = getDefaultWeave;
const getMeta = (0, _ramda.view)(metaLens);
exports.getMeta = getMeta;
const isFeatureLoaded = (0, _ramda.view)(metaIsLoadedLens);
exports.isFeatureLoaded = isFeatureLoaded;
const isFeatureUnloaded = (0, _ramda.compose)(_ramda.not, isFeatureLoaded);
exports.isFeatureUnloaded = isFeatureUnloaded;
const setFeatureIsLoaded = (0, _ramda.set)(metaIsLoadedLens);
exports.setFeatureIsLoaded = setFeatureIsLoaded;
const setHandlerResult = (0, _ramda.set)(metaResultLens);
exports.setHandlerResult = setHandlerResult;
const setDefaultMeta = setFeatureIsLoaded(false);
exports.setDefaultMeta = setDefaultMeta;
const featureIdEq = (0, _ramda.compose)((0, _ramda.propEq)('id'), getId);
exports.featureIdEq = featureIdEq;