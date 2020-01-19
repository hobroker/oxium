import { call, compose, map, reduce, splitEvery } from 'ramda';
import { promiseAll } from './index';

export const resolveInChunks = compose(
  reduce(
    (p, chunk) => p.then(() => compose(promiseAll, map(call))(chunk)),
    Promise.resolve(),
  ),
  splitEvery,
);
