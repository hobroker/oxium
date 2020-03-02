import debug from 'debug';
import {
  bind,
  filter,
  identity,
  join,
  memoizeWith,
  nthArg,
  pipe,
  slice,
  split,
  unapply,
} from 'ramda';
import { PKG_NAME } from '../constants';

const baseDebug = debug(PKG_NAME);

const extend = bind(baseDebug.extend, baseDebug);

const stack = () => {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = nthArg(1);
  const err = new Error();
  Error.captureStackTrace(err, stack);
  const errStack = err.stack;
  Error.prepareStackTrace = orig;

  return errStack;
};

const notIncluded = array => value => !array.includes(value);
const shortenPathname = pipe(
  slice(0, -3),
  split('/'),
  filter(notIncluded(['util'])),
  slice(-2, Infinity),
  filter(notIncluded(['index', 'src'])),
  join(':'),
);

export const getCallerPathname = (idx = 2) => {
  const pathname = stack()[idx].getFileName();

  return shortenPathname(pathname);
};

export const createDebug = ex => {
  const logWithKey = memoizeWith(identity, key => ex(key));
  const log = key => args => {
    const logKey = key || getCallerPathname(3);
    logWithKey(logKey)(...args);

    return args[0];
  };

  const fn = unapply(log());
  fn.lazy = (...args) => {
    const sublog = log(getCallerPathname(2));

    return () => {
      return sublog(args);
    };
  };

  return fn;
};

export const debugIt = createDebug(extend);
