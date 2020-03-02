import { andThen, applyTo, curry, pipe, when } from 'ramda';
import { isObjectLike, isFunction, resolveP } from 'ramda-adjunct';
import { getMetaResult } from './accessors/arg';
import { assign } from './util/lens';
import oxi from './util/oxi';
import { FEATURES, META, RESULT } from './constants';

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
  const result = oxi({});

  const getArg = () => ({
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
