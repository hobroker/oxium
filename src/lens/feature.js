import { compose, lensProp, over, set, view } from 'ramda';

const idLens = lensProp('id');
const handlerLens = lensProp('handler');

const metaLens = lensProp('_');
const isLoadedLens = lensProp('isLoaded');
const metaIsLoadedLens = compose(metaLens, isLoadedLens);

const getId = view(idLens);

const getHandler = view(handlerLens);
const updateHandler = over(handlerLens);

const isFeatureLoaded = view(metaIsLoadedLens);
const setFeatureIsLoaded = set(metaIsLoadedLens);

export { idLens, handlerLens, metaLens, isLoadedLens, metaIsLoadedLens };

export {
  getId,
  getHandler,
  updateHandler,
  isFeatureLoaded,
  setFeatureIsLoaded,
};
