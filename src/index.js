import {
  __,
  always,
  apply,
  applyTo,
  compose,
  converge,
  curry,
  curryN,
  defaultTo,
  identity,
  map,
  not,
  nthArg,
  then,
  useWith,
  when,
} from 'ramda';
import { cata, ensureArray } from 'ramda-adjunct';
import { Right } from 'monet';
import { ensurePromise, promiseAll } from './util';
import {
  getHandler,
  leftFeatureCata,
  rightFeatureCata,
} from './selectors/feature';
import { getFeatures, setFeatures } from './selectors/app';

const resolveHandler = curryN(
  2,
  compose(then(defaultTo(Right({}))), ensurePromise, applyTo),
);

export const resolveFeature = useWith(apply, [
  resolveHandler,
  compose(ensureArray, getHandler),
]);

export const foldHandlerResult = useWith(apply, [
  cata(always(leftFeatureCata), always(rightFeatureCata)),
  ensureArray,
]);

export const resolveFeatureHandler = curryN(
  2,
  converge(useWith(then, [applyTo, identity]), [
    nthArg(1),
    compose(then(foldHandlerResult), resolveFeature),
  ]),
);

export const runApp = curry((filterFn, isDoneFn, app) =>
  compose(
    then(
      compose(
        when(compose(not, isDoneFn), runApp(filterFn, isDoneFn)),
        setFeatures(__, app),
      ),
    ),
    promiseAll,
    map(resolveFeatureHandler(app)),
    filterFn,
    getFeatures,
  )(app),
);
