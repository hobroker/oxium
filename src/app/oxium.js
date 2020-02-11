import { andThen, compose, ifElse, map, not, pipe, tap } from 'ramda';
import { allP } from 'ramda-adjunct';
import { getFeatures } from '../lens';
import applyFeatureTo from './applyFeatureTo';
import replaceFeaturesIn from './replaceFeaturesIn';
import pipeAsync from '../util/pipeAsync';
import { createDebug } from '../util/debug';

const debugIt = createDebug('createAppRunner');

const promiseAllAndThen = fn => pipe(allP, andThen(fn));

const resolveFeaturesWith = app =>
  pipeAsync(
    map(applyFeatureTo(app)),
    promiseAllAndThen(replaceFeaturesIn(app)),
  );

const takeFeatures = fn => pipe(getFeatures, fn);

const createAppRunner = (filterFn, isDoneFn, _loop = 1) => {
  const runAgain = app => createAppRunner(filterFn, isDoneFn, _loop + 1)(app);
  const shouldRunAgain = compose(not, isDoneFn);
  const whenDone = tap(() => debugIt('done'));

  return app => {
    debugIt('start loop %d', _loop);

    return pipeAsync(
      takeFeatures(filterFn),
      resolveFeaturesWith(app),
      ifElse(shouldRunAgain, runAgain, whenDone),
    )(app);
  };
};

export default createAppRunner;
