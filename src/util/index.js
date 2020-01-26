import {
  allPass,
  applyTo,
  compose,
  converge,
  curry,
  identity,
  ifElse,
  propEq,
  reduce,
  then,
  toPairs,
  useWith,
} from 'ramda';
import { appendFlipped, isNotUndefined } from 'ramda-adjunct';
import { Either, Right } from 'monet';

export const assignOnce = curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const promiseAll = array => Promise.all(array);

export const ensurePromise = value => Promise.resolve(value);

export const safe = compose(converge(identity), appendFlipped([identity]));

export const noop = () => {};

export const isEither = allPass([isNotUndefined, Either.isOfType]);

export const isRight = allPass([isEither, propEq('isRightValue', true)]);

export const isLeft = allPass([isEither, propEq('isRightValue', false)]);

export const ensureEitherOrRight = ifElse(isEither, identity, Right);

export const wait = ms => new Promise(r => setTimeout(applyTo(ms, r), ms));

export const reduceObjIndexed = curry((fn, acc, obj) =>
  compose(
    reduce((result, [key, value]) => fn(result, value, key, obj), acc),
    toPairs,
  )(obj),
);

export const thenApplyTo = useWith(then, [applyTo, identity]);
