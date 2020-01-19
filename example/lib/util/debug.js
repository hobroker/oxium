import debug from 'debug';
import { measureTime } from '.';

const appDebug = debug('app');

export const debugIt = (...args) => appDebug(...args);

export const debugItFp = (...args) => {
  debugIt('args:', ...args);
  console.log('args:', ...args);

  return args[0];
};

export const debugItTime = () => {
  const measure = measureTime();

  return () => {
    const ms = measure();
    debugIt(`${ms}ms`);

    return ms;
  };
};
