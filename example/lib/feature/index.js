import { __, append, assocPath, compose, converge, nthArg, path } from 'ramda';

export const assocWith = compose(assocPath, append(__, ['with']));

export const getWith = converge(path, [
  append(__, ['with'], nthArg(0)),
  nthArg(1),
]);
