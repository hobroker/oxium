import { curry, find, findIndex, lens, propEq, update } from 'ramda';

const createLensFindByProp = curry((propName, propValue) =>
  lens(find(propEq(propName, propValue)), (val, arr) => {
    const index = findIndex(propEq(propName, propValue), arr);
    const replaceIndex = index > -1 ? index : arr.length;

    return update(replaceIndex, val, arr);
  }),
);

export const byIdLens = createLensFindByProp('id');
