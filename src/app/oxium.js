import { always, andThen, applyTo, curry, pipe, when } from 'ramda';
import { isObjectLike, isFunction, resolveP } from 'ramda-adjunct';
import { assign } from '../util/lens';
import { FEATURES, META, RESULT } from '../constants';
import { getMetaResult } from '../accessors/arg';

const resolveFeatureWith = curry(async (params, feature) => {
  const value = await pipe(
    feature,
    resolveP,
    andThen(when(isFunction, applyTo([]))),
  )(params);
  const result = getMetaResult(params);
  if (isObjectLike(value)) {
    assign(value, result);
  }

  return value;
});

const next = curry(async (features, params) => {
  const result = {};

  const getArg = always({
    ...params,
    [META]: {
      [RESULT]: result,
      [FEATURES]: features,
    },
  });

  for (const feature of features) {
    await resolveFeatureWith(getArg(), feature);
  }

  return result;
});

export default next;
