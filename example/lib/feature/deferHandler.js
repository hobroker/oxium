import { Just, Nothing } from 'sanctuary';
import { evolve } from 'ramda';

const deferHandler = validator =>
  evolve({
    handler: originalHandler => async (...args) => {
      if (await validator(...args)) {
        return Promise.resolve(originalHandler(...args)).then(Just);
      }

      return Nothing;
    },
  });

export default deferHandler;
