import debug from 'debug';
import {
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

const PKG_NAME = 'oxium';

const notIncluded = array => value => !array.includes(value);

const getErrorStack = () => {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = nthArg(1);
  const error = new Error();
  Error.captureStackTrace(error, getErrorStack);
  const errStack = error.stack;
  Error.prepareStackTrace = orig;

  return errStack;
};

const shortenPathname = pipe(
  slice(0, -3),
  split('/'),
  filter(notIncluded(['util'])),
  slice(-2, Infinity),
  filter(notIncluded(['index', 'src'])),
  join(':'),
);

export const getCallerPathname = (idx = 2) => {
  const pathname = getErrorStack()[idx].getFileName();

  return shortenPathname(pathname);
};

const baseDebug = debug(PKG_NAME);

const createDebug = base => {
  const logWithKey = memoizeWith(identity, key => base.extend(key));
  const log = key => args => {
    const logKey = key || getCallerPathname(3);
    logWithKey(logKey)(...args);

    return args[0];
  };

  const fn = unapply(log());
  fn.lazy = (...args) => {
    const sublog = log(getCallerPathname(2));

    return () => sublog(args);
  };

  return fn;
};

export const debugIt = createDebug(baseDebug);

export default createDebug;
