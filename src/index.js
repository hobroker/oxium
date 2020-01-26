import { compose, curry, map, not, then, when } from 'ramda';
import { promiseAll } from './util';
import { getFeatures, replaceFeatures } from './selectors/app';
import resolveFeatureWith from './util/resolveFeatureWith';

export const createAppRunner = curry((filterFn, isDoneFn, app) => {
  const runAgainOrReturn = when(
    compose(not, isDoneFn),
    createAppRunner(filterFn, isDoneFn),
  );

  return compose(
    then(compose(runAgainOrReturn, replaceFeatures(app))),
    promiseAll,
    map(resolveFeatureWith(app)),
    filterFn,
    getFeatures,
  )(app);
});
