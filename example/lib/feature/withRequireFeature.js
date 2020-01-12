import assert from 'assert';
import { curry } from 'ramda';
import { getId } from '../selectors/feature';
import { appHasFeature } from '../selectors/app';
import { assocWith } from '.';

const withRequireFeature = assocWith('require');

const withRequireFeatureEvaluator = curry((key, params) => {
  const id = getId(params.feature);

  assert(
    appHasFeature(key, params),
    `feature "${key}" is required by feature "${id}"`,
  );
});

export { withRequireFeature, withRequireFeatureEvaluator };
