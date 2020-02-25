import { assocPath, curry, lens, path, prop, toPairs } from 'ramda';
import { isObjectLike } from 'ramda-adjunct';
import invariant from './invariant';

export const assocPathM = curry((propPath, value, target) => {
  const tmp = assocPath(propPath, value, {});

  return Object.assign(target, tmp);
});

export const lensPathM = key => lens(path(key), assocPathM([key]));

export const assignValue = curry((key, value, target) => {
  target[key] = value;

  return target;
});

export const assign = curry((source, target) => {
  invariant(isObjectLike(source), '"source" must be object like');
  invariant(isObjectLike(target), '"target" must be object like');

  toPairs(source).map(([key, value]) => assignValue(key, value, target));

  return target;
});

export const createAccessor = key => [assignValue(key), prop(key)];
