import { compose, converge, curry, identity } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';

export const assignOnce = curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

export const promiseAll = array => Promise.all(array);

export const safe = compose(converge(identity), appendFlipped([identity]));

export const measureTime = () => {
  const hrstart = process.hrtime();

  return () => {
    const hrend = process.hrtime(hrstart);
    const [seconds, nanoseconds] = hrend;

    return Number(seconds * 1000 + nanoseconds / 10 ** 6);
  };
};
