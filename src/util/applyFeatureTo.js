import { curry } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { getHandler, getId, setFeatureIsLoaded } from '../lens/feature';
import { ensurePromise } from './promise';
import pipeAsync from './pipeAsync';
import { HANDLER_NOT_READY_RESULT } from '../constants';
import { debugItRuntime } from './debug';

const transformRightResult = setFeatureIsLoaded(true);

const transformResult = (feature, result) => {
  if (result === HANDLER_NOT_READY_RESULT) {
    return feature;
  }

  if (isFunction(result)) {
    return pipeAsync(transformRightResult, result)(feature);
  }

  return transformRightResult(feature);
};

const applyFeatureTo = curry(async (app, feature) => {
  debugItRuntime('applyFeatureTo feature', getId(feature));
  const handler = getHandler(feature);
  const result = await ensurePromise(handler(app));

  return transformResult(feature, result);
});

export default applyFeatureTo;
