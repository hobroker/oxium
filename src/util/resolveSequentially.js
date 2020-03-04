import { curry, reduce } from 'ramda';

const resolveSequentially = curry((fn, array) =>
  reduce((p, item) => p.then(() => fn(item)), Promise.resolve(), array),
);

export default resolveSequentially;
