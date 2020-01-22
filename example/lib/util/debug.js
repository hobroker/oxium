import debug from 'debug';

const appDebug = debug('app');

export const createDebug = key => appDebug.extend(key);

export const debugIt = (...args) => appDebug(...args);

export const debugItFp = (...args) => {
  debugIt('FP:', ...args);

  return args[0];
};
