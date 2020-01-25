import {
  always,
  applyTo,
  assoc,
  compose,
  converge,
  curry,
  identity,
  nthArg,
  prop,
} from 'ramda';
import { isFunction, isObject, isString, stubObject } from 'ramda-adjunct';
import { reduceObjIndexed } from './index';

const findTransformer = recursiveFn => value => {
  const computePairs = [
    [isFunction, identity],
    [isObject, recursiveFn],
    [isString, prop],
  ];

  for (const [validator, fn] of computePairs) {
    if (validator(value)) {
      return fn(value);
    }
  }

  return always(value);
};

const mapTo = curry((spec, object) =>
  reduceObjIndexed(
    converge(assoc, [
      nthArg(2),
      compose(applyTo(object), findTransformer(mapTo), nthArg(1)),
      nthArg(0),
    ]),
    stubObject(),
    spec,
  ),
);

export default mapTo;
