import { compose, lensProp, not, over, set, view } from 'ramda';

const idLens = lensProp('id');
const handlerLens = lensProp('handler');
const defaultLens = lensProp('default');

const weaveLens = lensProp('weave');
const defaultWeaveLens = compose(weaveLens, defaultLens);

const metaLens = lensProp('_');
const isLoadedLens = lensProp('isLoaded');
const resultLens = lensProp('result');
const metaIsLoadedLens = compose(metaLens, isLoadedLens);
const metaResultLens = compose(metaLens, resultLens);

const sharedLens = lensProp('shared');

const getId = view(idLens);

const getHandler = view(handlerLens);
const updateHandler = over(handlerLens);

const getWeave = view(weaveLens);
const setDefaultWeave = set(defaultWeaveLens);
const getDefaultWeave = view(defaultWeaveLens);

const getMeta = view(metaLens);
const isFeatureLoaded = view(metaIsLoadedLens);
const isFeatureUnloaded = compose(not, isFeatureLoaded);
const setFeatureIsLoaded = set(metaIsLoadedLens);
const setHandlerResult = set(metaResultLens);
const setDefaultMeta = setFeatureIsLoaded(false);

export {
  idLens,
  handlerLens,
  defaultLens,
  weaveLens,
  defaultWeaveLens,
  metaLens,
  isLoadedLens,
  resultLens,
  metaIsLoadedLens,
  metaResultLens,
  sharedLens,
};

export {
  getId,
  getHandler,
  updateHandler,
  getWeave,
  setDefaultWeave,
  getDefaultWeave,
  getMeta,
  isFeatureLoaded,
  isFeatureUnloaded,
  setFeatureIsLoaded,
  setHandlerResult,
  setDefaultMeta,
};
