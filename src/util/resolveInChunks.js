import { call, compose, curryN, map, reduce, splitEvery } from 'ramda';
import { promiseAll } from '.';

export const resolveInChunks = curryN(
  2,
  compose(
    reduce(
      (p, chunk) => p.then(() => compose(promiseAll, map(call))(chunk)),
      Promise.resolve(),
    ),
    splitEvery,
  ),
);
