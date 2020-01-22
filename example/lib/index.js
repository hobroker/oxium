import { compose, curry, curryN, map } from 'ramda';
import { isNothing, promiseAll } from './util';
import { getHandler, setFeatureIsLoaded, setMeta } from './selectors/feature';
import { areAllFeaturesLoaded } from './selectors/features';
import { setFeatures } from './selectors/app';

export const resolveHandlersPure = curryN(2, compose(promiseAll, map));

export const resolveHandlers = curry(async (takeFn, callFn, features) => {
  if (areAllFeaturesLoaded(features)) {
    return features;
  }

  const pickedFeatures = takeFn(features);
  const handlers = map(getHandler, pickedFeatures);

  const results = await resolveHandlersPure(
    callFn(setFeatures(features, {})),
    handlers,
  );
  const resultsMap2 = results.reduce(
    (acc, item, idx) => acc.set(pickedFeatures[idx], item),
    new Map(),
  );
  const updatedFeatures = map(feature => {
    if (
      !handlers.includes(feature.handler) ||
      isNothing(resultsMap2.get(feature))
    ) {
      return feature;
    }

    return setFeatureIsLoaded(true, feature);
  }, features);

  return resolveHandlers(takeFn, callFn, updatedFeatures);
});

export const setDefaultMeta = setMeta({
  isLoaded: false,
});
