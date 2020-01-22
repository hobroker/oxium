import { compose, curry, curryN, map } from 'ramda';
import { isNothing, promiseAll, readArray } from './util';
import { getHandler, setMeta, setFeatureIsLoaded } from './selectors/feature';
import { areAllFeaturesLoaded } from './selectors/features';

export const resolveHandlersPure = curryN(2, compose(promiseAll, map));

export const resolveHandlers = curry(async (takeFn, callFn, features) => {
  if (areAllFeaturesLoaded(features)) {
    return features;
  }

  const pickedFeatures = takeFn(features);
  const handlers = map(getHandler, pickedFeatures);

  const results = await resolveHandlersPure(callFn({ features }), handlers);
  const nextResult = readArray(results);
  const updatedFeatures = map(feature => {
    if (!handlers.includes(feature.handler)) {
      return feature;
    }
    const result = nextResult();
    if (isNothing(result)) {
      return feature;
    }

    return setFeatureIsLoaded(true, feature);
  }, features);

  return resolveHandlers(takeFn, callFn, updatedFeatures);
});

export const attachDefaultMeta = setMeta({
  isLoaded: false,
});
