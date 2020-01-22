import { compose, lensProp, over, set, view } from 'ramda';

export const idLens = lensProp('id');
export const handlerLens = lensProp('handler');

// meta/
export const metaLens = lensProp('_');
export const isLoadedLens = lensProp('isLoaded');

// meta/*Lens
export const metaIsLoadedLens = compose(metaLens, isLoadedLens);

export const getId = view(idLens);

export const getHandler = view(handlerLens);
export const updateHandler = over(handlerLens);

export const setMeta = set(metaLens);

export const isFeatureLoaded = view(metaIsLoadedLens);

export const setFeatureIsLoaded = set(metaIsLoadedLens);
