import { curry } from 'ramda';
import { isFunction, resolveP } from 'ramda-adjunct';
import { getHandler, getId, setFeatureIsLoaded } from '../lens';
import pipeAsync from '../util/pipeAsync';
import { HANDLER_NOT_READY_RESULT } from '../constants';
import { createDebug } from '../util/debug';

const debugIt = createDebug('applyFeatureTo');

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
  debugIt('feature %s', getId(feature));
  const handler = getHandler(feature);
  const result = await resolveP(handler(app));

  return transformResult(feature, result);
});

export default applyFeatureTo;
