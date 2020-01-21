import {
  __,
  and,
  compose,
  curry,
  curryN,
  identity,
  includes,
  map,
  not,
  useWith,
} from 'ramda';
import { isEmptyArray, mapIndexed, omitIndexes } from 'ramda-adjunct';
import { isNothing } from 'sanctuary';
import { promiseAll } from './util';
import { getFeatures } from './selectors/params';
import { getHandler } from './selectors/feature';

export const prepareFeatureHandlers = compose(map(getHandler), getFeatures);

export const resolveHandlersPure = curryN(2, compose(promiseAll, map));

export const resolveHandlers = curry(async (takeFn, callFn, handlers) => {
  if (isEmptyArray(handlers)) {
    return null;
  }

  const pickedHandlers = takeFn(handlers);
  const omitUnresolvedHandlers = compose(
    omitIndexes(__, pickedHandlers),
    mapIndexed(useWith(and, [isNothing, identity])),
  );

  const results = await resolveHandlersPure(callFn, pickedHandlers);
  const resolvedHandlers = omitUnresolvedHandlers(results);
  const handlersLeft = handlers.filter(
    compose(not, includes(__, resolvedHandlers)),
  );

  return resolveHandlers(takeFn, callFn, handlersLeft);
});
