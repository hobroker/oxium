import { compose, curry, map, not, then, when } from 'ramda';
import { getFeatures, replaceFeatures } from './lens/app';
import { promiseAll, applyFeatureTo } from './util';

const createAppRunner = curry((filterFn, isDoneFn, app) => {
  const runAgainOrReturn = when(
    compose(not, isDoneFn),
    createAppRunner(filterFn, isDoneFn),
  );

  return compose(
    then(compose(runAgainOrReturn, replaceFeatures(app))),
    promiseAll,
    map(applyFeatureTo(app)),
    filterFn,
    getFeatures,
  )(app);
});

export default createAppRunner;
