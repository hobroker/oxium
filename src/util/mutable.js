import { assocPath, curry, toPairs } from 'ramda';

export const assocPathM = curry((propPath, value, target) => {
  const [first] = propPath;
  const tmp = assocPath(propPath, value, {});
  target[first] = tmp[first];

  return target;
});

export const assign = curry((source, target) => {
  toPairs(source).map(([key, value]) => assocPathM([key], value, target));

  return target;
});

export const assocM = curry((key, value, target) =>
  assocPathM([key], value, target),
);
