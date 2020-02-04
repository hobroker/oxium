import {
  always,
  applyTo,
  compose,
  converge,
  curry,
  identity,
  ifElse,
  then,
} from 'ramda';
import { cata, isFunction } from 'ramda-adjunct';
import { getHandler, setFeatureIsLoaded } from '../lens/feature';
import { ensureEitherOrRight } from './either';
import { ensurePromise } from './async';

const mapRightResult = converge(compose, [
  always(setFeatureIsLoaded(true)),
  ifElse(isFunction, identity, always(identity)),
]);

const mapLeftResult = always(identity);

const resolveHandler = curry((app, handler) =>
  compose(then(ensureEitherOrRight), ensurePromise, handler)(app),
);

const callFeatureWith = curry((app, feature) =>
  compose(resolveHandler(app), getHandler)(feature),
);

const applyFeatureTo = curry((app, feature) =>
  compose(
    then(applyTo(feature)),
    then(cata(mapLeftResult, mapRightResult)),
    callFeatureWith,
  )(app, feature),
);

export default applyFeatureTo;
