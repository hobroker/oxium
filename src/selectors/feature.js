import { compose, identity, lensProp, not, over, set, view } from 'ramda';

export const idLens = lensProp('id');
export const handlerLens = lensProp('handler');

// meta/
export const metaLens = lensProp('_');
export const isLoadedLens = lensProp('isLoaded');
export const resultLens = lensProp('result');

// meta/*Lens
export const metaIsLoadedLens = compose(metaLens, isLoadedLens);
export const metaResultLens = compose(metaLens, resultLens);

export const getId = view(idLens);

export const getHandler = view(handlerLens);
export const updateHandler = over(handlerLens);

export const setMeta = set(metaLens);

export const isFeatureLoaded = view(metaIsLoadedLens);
export const isFeatureUnloaded = compose(not, isFeatureLoaded);

export const setFeatureIsLoaded = set(metaIsLoadedLens);

export const setHandlerResult = set(metaResultLens);
export const setDefaultMeta = setMeta({
  isLoaded: false,
});
export const rightFeatureCata = setFeatureIsLoaded(true);
export const leftFeatureCata = identity;
