import { has, keys } from 'ramda';
import { assocM } from './mutable';
import { debugIt } from './debug';

const oxi = arg => {
  let proxy = null;
  const other = {
    debug: () => debugIt(keys(arg)),
  };

  const proxyTarget = resolver => resolver(proxy);
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
  proxy = new Proxy(proxyTarget, { get, set });

  return proxy;
};

export default oxi;
