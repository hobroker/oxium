import { compose, curry, map, not, then, when } from 'ramda';
import { getFeatures } from './lens/app';
import { promiseAll } from './util/async';
import applyFeatureTo from './util/applyFeatureTo';
import replaceFeaturesIn from './util/replaceFeaturesIn';

const createAppRunner = curry((filterFn, isDoneFn, app) => {
  const runAgainOrReturn = when(
    compose(not, isDoneFn),
    createAppRunner(filterFn, isDoneFn),
  );

  return compose(
    then(compose(runAgainOrReturn, replaceFeaturesIn(app))),
    promiseAll,
    map(applyFeatureTo(app)),
    filterFn,
    getFeatures,
  )(app);
});

export default createAppRunner;
