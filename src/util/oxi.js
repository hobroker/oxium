import { always, has, keys } from 'ramda';
import { assocPathM } from './lens';
import { debugIt } from './debug';

const oxi = arg => {
  const other = {
    then: always(undefined),
    debug: () => debugIt(keys(arg)),
  };

  const getValue = key => {
    if (has(key, arg)) {
      return arg[key];
    }

    if (has(key, other)) {
      return other[key];
    }

    throw new Error(`key "${key}" does not exist`);
  };

  const root = {};
  const target = resolver => resolver(root.target);
  const get = (_, key) => getValue(key);
  const set = (_, key, value) => {
    assocPathM([key], value, arg);

    return true;
  };
  const fn = new Proxy(target, { get, set });
  root.target = fn;

  return root.target;
};

export default oxi;
