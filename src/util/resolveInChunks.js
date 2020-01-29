import { call, compose, curryN, map, reduce, splitEvery } from 'ramda';
import { promiseAll } from './promise';

const resolveInChunks = curryN(
  2,
  compose(
    reduce(
      (p, chunk) => p.then(() => compose(promiseAll, map(call))(chunk)),
      Promise.resolve(),
    ),
    splitEvery,
  ),
);

export default resolveInChunks;
