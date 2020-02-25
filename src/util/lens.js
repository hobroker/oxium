import { assocPath, curry, lens, path, toPairs } from 'ramda';

export const assocPathM = curry((propPath, value, target) => {
  const tmp = assocPath(propPath, value, {});

  return Object.assign(target, tmp);
});

export const lensPathM = key => lens(path(key), assocPathM([key]));

export const assign = curry((source, target) => {
  toPairs(source).map(([key, value]) => assocPathM([key], value, target));

  return target;
});
