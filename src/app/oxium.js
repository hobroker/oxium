import { curry } from 'ramda';
import { isObjectLike } from 'ramda-adjunct';
import { assign } from '../util';

const resolveFeatureWith = curry(async (params, feature) => {
  const val = await feature(params);
  const {
    _: { result },
  } = params;
  if (isObjectLike(val)) {
    assign(val, result);
  }

  return val;
});

const next = curry(async (features, params) => {
  const result = {};

  for (const feature of features) {
    const arg = {
      ...params,
      _: {
        result,
        features,
      },
    };
    await resolveFeatureWith(arg, feature);
  }

  return result;
});

export default next;
