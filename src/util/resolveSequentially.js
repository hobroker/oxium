import { reduce } from 'ramda';

const resolveSequentially = fn =>
  reduce((p, item) => p.then(() => fn(item)), Promise.resolve());

export default resolveSequentially;
