import { has, keys } from 'ramda';
import { assocM } from './mutable';
import { debugIt } from './debug';

const oxi = arg => {
  let targetProxy = null;
  const other = {
    debug: () => debugIt(keys(arg)),
  };

  const target = resolver => resolver(targetProxy);
  const get = (obj, key) => {
    if (has(key, arg)) {
      return arg[key];
    }

    if (has(key, other)) {
      return other[key];
    }

    return obj[key];
  };
  const set = (_, key, value) => {
    assocM(key, value, arg);

    return true;
  };

  targetProxy = new Proxy(target, { get, set });

  return targetProxy;
};

export default oxi;
