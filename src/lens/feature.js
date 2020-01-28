import { compose, lensProp, not, over, propEq, set, view } from 'ramda';

export const idLens = lensProp('id');
export const handlerLens = lensProp('handler');
export const defaultLens = lensProp('default');

export const weaveLens = lensProp('weave');
export const defaultWeaveLens = compose(weaveLens, defaultLens);

export const metaLens = lensProp('_');
export const isLoadedLens = lensProp('isLoaded');
export const resultLens = lensProp('result');
export const metaIsLoadedLens = compose(metaLens, isLoadedLens);
export const metaResultLens = compose(metaLens, resultLens);

export const sharedLens = lensProp('shared');

export const getId = view(idLens);

export const getHandler = view(handlerLens);
export const updateHandler = over(handlerLens);

export const getWeave = view(weaveLens);
export const setDefaultWeave = set(defaultWeaveLens);

export const getMeta = view(metaLens);

export const isFeatureLoaded = view(metaIsLoadedLens);
export const isFeatureUnloaded = compose(not, isFeatureLoaded);

export const setFeatureIsLoaded = set(metaIsLoadedLens);

export const setHandlerResult = set(metaResultLens);
export const setDefaultMeta = setFeatureIsLoaded(false);

export const featureIdEq = compose(propEq('id'), getId);
