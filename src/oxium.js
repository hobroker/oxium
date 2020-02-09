import { compose, converge, map, not, o, pipe, when } from 'ramda';
import { getFeatures } from './lens/app';
import { promiseAllAndThen } from './util/promise';
import applyFeatureTo from './util/applyFeatureTo';
import replaceFeaturesIn from './util/replaceFeaturesIn';
import pipeAsync from './util/pipeAsync';

const resolveFeaturesWith = converge(pipeAsync, [
  o(map, applyFeatureTo),
  o(promiseAllAndThen, replaceFeaturesIn),
]);

const takeFeatures = fn => pipe(getFeatures, fn);

const createAppRunner = (filterFn, isDoneFn) => {
  const runAgain = app => createAppRunner(filterFn, isDoneFn)(app);
  const shouldRunAgain = compose(not, isDoneFn);

  return app =>
    pipeAsync(
      takeFeatures(filterFn),
      resolveFeaturesWith(app),
      when(shouldRunAgain, runAgain),
    )(app);
};

export default createAppRunner;
