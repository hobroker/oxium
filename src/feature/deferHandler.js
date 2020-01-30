import { Left } from 'monet';
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
import { updateHandler } from '../lens/feature';
import { ensurePromise } from '../util/async';
import { ensureEitherOrRight } from '../util/either';

const handlerTransformation = curry((validator, originalHandler) => (...args) =>
  compose(
    then(
      ifElse(
        identity,
        compose(
          then(ensureEitherOrRight),
          ensurePromise,
          apply(originalHandler),
          always(args),
        ),
        compose(Left, always(null)),
      ),
    ),
    ensurePromise,
    apply(validator),
  )(args),
);

const deferHandler = useWith(updateHandler, [handlerTransformation, identity]);

export default deferHandler;
