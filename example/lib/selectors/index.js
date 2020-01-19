import {
  curry,
  find,
  findIndex,
  identity,
  lens,
  propEq,
  update,
  useWith,
  view,
} from 'ramda';

const createLensFindByProp = curry((propName, propValue) =>
  lens(find(propEq(propName, propValue)), (val, arr) => {
    const index = findIndex(propEq(propName, propValue), arr);
    const replaceIndex = index > -1 ? index : arr.length;

    return update(replaceIndex, val, arr);
  }),
);

export const byIdLens = createLensFindByProp('id');

export const getById = useWith(view, [byIdLens, identity]);

// const items = {
//   features: [
//     { id: 'mongo', handler: 1 },
//     { id: 'demo', handler: 2 },
//   ],
// };
//
// const updateHandler = over(
//   featuresLens,
//   map(over(byIdLens('mongo'), setHandler('33'))),
// );

// console.log(JSON.stringify(converge(assocPath,[]), null, 2));
