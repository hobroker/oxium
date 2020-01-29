import {
  always,
  applyTo,
  assoc,
  compose,
  cond,
  converge,
  curry,
  identity,
  nthArg,
  prop,
  T,
} from 'ramda';
import { isFunction, isObject, isString, stubObj } from 'ramda-adjunct';
import { reduceObjIndexed } from './object';

const findTransformer = recursiveFn =>
  cond([
    [isFunction, identity],
    [isObject, recursiveFn],
    [isString, prop],
    [T, always],
  ]);

const mapTo = curry((spec, object) =>
  reduceObjIndexed(
    converge(assoc, [
      nthArg(2),
      compose(applyTo(object), findTransformer(mapTo), nthArg(1)),
      nthArg(0),
    ]),
    stubObj(),
    spec,
  ),
);

export default mapTo;
