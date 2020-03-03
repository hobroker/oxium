import { andThen, applyTo, curry, pipe, when } from 'ramda';
import { isFunction, isObjectLike, resolveP } from 'ramda-adjunct';
import { assign } from './util/mutable';
import oxi from './util/oxi';
import resolveSequentially from './util/resolveSequentially';

const resolveFeatureWith = curry(async (acc, features, feature) => {
  const optionalFnArg = [];
  const value = await pipe(
    feature,
    resolveP,
    andThen(when(isFunction, applyTo(optionalFnArg))),
  )(acc, features);

  if (isObjectLike(value)) {
    return assign(value, acc);
  }

  return acc;
});

const oxium = curry(async (features, params) => {
  const result = oxi(params);
  const resolveFeatures = resolveFeatureWith(result, features);

  return resolveSequentially(resolveFeatures)(features);
});

export default oxium;
