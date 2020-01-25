import { Left, Right } from 'monet';
import { apply, compose, curry, identity, then, useWith } from 'ramda';
import { ensurePromise } from '../util';
import { updateHandler } from '../selectors/feature';

const callHandler = handler =>
  compose(then(Right), ensurePromise, apply(handler));

const handlerTransformation = curry((validator, originalHandler) => (...args) =>
  compose(
    then(valid => {
      if (!valid) {
        return Left(null);
      }

      return callHandler(originalHandler)(args);
    }),
    ensurePromise,
    apply(validator),
  )(args),
);

const deferHandler = useWith(updateHandler, [handlerTransformation, identity]);

export default deferHandler;
