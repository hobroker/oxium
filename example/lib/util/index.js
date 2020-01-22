import { compose, converge, curry, equals, identity } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import { Nothing } from 'sanctuary';

export const assignOnce = curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const promiseAll = array => Promise.all(array);

export const toPromise = value => Promise.resolve(value);

export const isNothing = equals(Nothing);

export const readArray = array => {
  let idx = 0;

  return () => {
    const value = array[idx];
    idx += 1;

    return value;
  };
};

export const safe = compose(converge(identity), appendFlipped([identity]));

export const measureTime = () => {
  const hrstart = process.hrtime();

  return () => {
    const hrend = process.hrtime(hrstart);
    const [seconds, nanoseconds] = hrend;

    return Number(seconds * 1000 + nanoseconds / 10 ** 6);
  };
};
