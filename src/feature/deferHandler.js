import { Left, Right } from 'monet';
import {
  always,
  apply,
  compose,
  curry,
  identity,
  ifElse,
  then,
  useWith,
} from 'ramda';
import { ensurePromise } from '../util';
import { updateHandler } from '../lens/feature';

const callHandler = handler => compose(ensurePromise, apply(handler));

const handlerTransformation = curry((validator, originalHandler) => (...args) =>
  compose(
    then(
      ifElse(
        identity,
        compose(then(Right), apply(callHandler(originalHandler)), always(args)),
        compose(Left, always(null)),
      ),
    ),
    ensurePromise,
    apply(validator),
  )(args),
);

const deferHandler = useWith(updateHandler, [handlerTransformation, identity]);

export default deferHandler;
