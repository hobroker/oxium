import {
  always,
  apply,
  applyTo,
  compose,
  converge,
  curry,
  curryN,
  identity,
  ifElse,
  then,
  useWith,
} from 'ramda';
import { cata, ensureArray, isFunction } from 'ramda-adjunct';
import { getHandler, setFeatureIsLoaded } from '../lens/feature';
import { ensureEitherOrRight, ensurePromise } from '.';

const formatAppArgument = identity;

export const rightResultMap = converge(compose, [
  always(setFeatureIsLoaded(true)),
  ifElse(isFunction, identity, always(identity)),
]);

export const leftResultMap = always(identity);

const resolveHandler = curryN(
  2,
  compose(then(ensureEitherOrRight), ensurePromise, applyTo),
);

const resolveFeature = useWith(apply, [
  compose(resolveHandler, formatAppArgument),
  compose(ensureArray, getHandler),
]);

const foldHandlerResult = useWith(apply, [
  cata(leftResultMap, rightResultMap),
  ensureArray,
]);

const resolveFeatureWith = curry((app, feature) =>
  resolveFeature(app, feature)
    .then(foldHandlerResult)
    .then(applyTo(feature)),
);

export default resolveFeatureWith;
