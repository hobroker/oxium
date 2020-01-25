import debug from 'debug';

const appDebug = debug('app');

export const createDebug = key => appDebug.extend(key);

export const debugIt = (...args) => appDebug(...args);

export const debugFp = createDebug('fp');
export const debugItFp = (...args) => {
  debugFp(args);

  return args[0];
};
