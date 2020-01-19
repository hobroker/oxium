import assert from 'assert';
import { compose, curry, lensProp, set } from 'ramda';
import { getId, withLens } from '../selectors/feature';
import { appHasFeature } from '../selectors/app';

const configLens = lensProp('require');
const withRequireLens = compose(withLens, configLens);

export const withRequireFeature = set(withRequireLens);

export const withRequireFeatureEvaluator = curry((key, params) => {
  const id = getId(params.feature);

  assert(
    appHasFeature(key, params),
    `feature "${key}" is required by feature "${id}"`,
  );
});
