import { compose, curry, reduce, toPairs } from 'ramda';

export const assign = curry((key, value, target) => {
  target[key] = value;

  return target;
});

export const reduceObjIndexed = curry((fn, acc, obj) =>
  compose(
    reduce((result, [key, value]) => fn(result, value, key, obj), acc),
    toPairs,
  )(obj),
);
