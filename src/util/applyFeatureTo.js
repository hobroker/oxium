import {
  always,
  applyTo,
  compose,
  converge,
  curry,
  identity,
  ifElse,
  andThen,
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
  compose(andThen(ensureEitherOrRight), ensurePromise, handler)(app),
);

const callFeatureWith = curry((app, feature) =>
  compose(resolveHandler(app), getHandler)(feature),
);

const applyFeatureTo = curry((app, feature) =>
  compose(
    andThen(applyTo(feature)),
    andThen(cata(mapLeftResult, mapRightResult)),
    callFeatureWith,
  )(app, feature),
);

export default applyFeatureTo;
