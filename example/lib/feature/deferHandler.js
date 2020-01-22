import { Just, Nothing } from 'sanctuary';
import { apply, compose, curry, identity, then, useWith } from 'ramda';
import { toPromise } from '../util';
import { updateHandler } from '../selectors/feature';

const callHandler = handler => compose(then(Just), toPromise, apply(handler));

const handlerTransformation = curry((validator, originalHandler) => (...args) =>
  compose(
    then(valid => {
      if (!valid) {
        return Nothing;
      }

      return callHandler(originalHandler)(args);
    }),
    toPromise,
    apply(validator),
  )(args),
);

const deferHandler = useWith(updateHandler, [handlerTransformation, identity]);

export default deferHandler;
