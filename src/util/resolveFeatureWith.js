import {
  apply,
  applyTo,
  compose,
  converge,
  curryN,
  identity,
  nthArg,
  then,
  useWith,
} from 'ramda';
import { cata, ensureArray } from 'ramda-adjunct';
import { getHandler, leftResultCata, rightResultCata } from '../lens/feature';
import { ensureEitherOrRight, ensurePromise, thenApplyTo } from './index';

export const formatAppArgument = identity;

const resolveHandler = curryN(
  2,
  compose(then(ensureEitherOrRight), ensurePromise, applyTo),
);

const resolveFeature = useWith(apply, [
  compose(resolveHandler, formatAppArgument),
  compose(ensureArray, getHandler),
]);

const foldHandlerResult = useWith(apply, [
  cata(leftResultCata, rightResultCata),
  ensureArray,
]);

const resolveFeatureWith = curryN(
  2,
  converge(thenApplyTo, [
    nthArg(1),
    compose(then(foldHandlerResult), resolveFeature),
  ]),
);

export default resolveFeatureWith;
