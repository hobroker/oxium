import { compose, lensProp, over, set, view } from 'ramda';
import { HANDLER, ID, IS_LOADED, META } from '../constants';

const idLens = lensProp(ID);
const handlerLens = lensProp(HANDLER);

const metaLens = lensProp(META);
const isLoadedLens = lensProp(IS_LOADED);
const metaIsLoadedLens = compose(metaLens, isLoadedLens);

const getId = view(idLens);

const getHandler = view(handlerLens);
const updateHandler = over(handlerLens);

const setFeatureIsLoaded = set(metaIsLoadedLens);

export { idLens, handlerLens, metaLens, isLoadedLens, metaIsLoadedLens };

export { getId, getHandler, updateHandler, setFeatureIsLoaded };
