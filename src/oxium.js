import { andThen, applyTo, curry, pipe, when } from 'ramda';
import { isFunction, isObjectLike, resolveP } from 'ramda-adjunct';
import { assign } from './util/mutable';
import oxi from './util/oxi';

const resolveFeatureWith = curry(async (acc, features, feature) => {
  const optionalFnArg = [];
  const transformResult = when(isFunction, applyTo(optionalFnArg));
  const value = await pipe(
    feature,
    resolveP,
    andThen(transformResult),
  )(acc, features);

  if (isObjectLike(value)) {
    return assign(value, acc);
  }

  return acc;
});

const oxium = curry(async (features, params) => {
  const result = oxi(params);
  const resolveFeatures = resolveFeatureWith(result, features);

  for (const feature of features) {
    await resolveFeatures(feature);
  }

  return resolveP(result);
});

export default oxium;
