import { assocPath, compose, identity, path, useWith } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';

export const assocWith = compose(assocPath, appendFlipped(['with']));

export const getWith = useWith(path, [appendFlipped(['with']), identity]);
