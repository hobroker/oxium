import { curry } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { getHandler, setFeatureIsLoaded } from '../lens/feature';
import { ensurePromise } from './promise';
import pipeAsync from './pipeAsync';
import { HANDLER_NOT_READY_RESULT } from '../constants';

const transformRightResult = setFeatureIsLoaded(true);

const applyFeatureTo = curry(async (app, feature) => {
  const handler = getHandler(feature);
  const result = await ensurePromise(handler(app));

  if (result === HANDLER_NOT_READY_RESULT) {
    return feature;
  }

  if (isFunction(result)) {
    return pipeAsync(transformRightResult, result)(feature);
  }

  return transformRightResult(feature);
});

export default applyFeatureTo;
