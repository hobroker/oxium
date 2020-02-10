import { compose, lensProp, not, over, set, view } from 'ramda';
import { HANDLER, ID, IS_LOADED, META } from '../constants';

export const idLens = lensProp(ID);
export const handlerLens = lensProp(HANDLER);

export const metaLens = lensProp(META);
export const isLoadedLens = lensProp(IS_LOADED);
export const metaIsLoadedLens = compose(metaLens, isLoadedLens);

export const getId = view(idLens);
export const setId = set(idLens);

export const getHandler = view(handlerLens);
export const setHandler = set(handlerLens);
export const updateHandler = over(handlerLens);

export const setFeatureIsLoaded = set(metaIsLoadedLens);
export const isFeatureLoaded = view(metaIsLoadedLens);
export const isFeatureUnloaded = compose(not, isFeatureLoaded);
