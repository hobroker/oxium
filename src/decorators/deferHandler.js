import { Left } from 'monet';
import {
  always,
  apply,
  compose,
  curry,
  defaultTo,
  identity,
  ifElse,
  andThen,
  useWith,
} from 'ramda';
import { updateHandler } from '../lens/feature';
import { ensurePromise } from '../util/async';
import { ensureEitherOrRight } from '../util/either';

const mapValidResult = compose(andThen(ensureEitherOrRight), ensurePromise);
const mapInvalidResult = compose(Left, defaultTo(null));

const fnTransformation = curry((validator, originalHandler) => (...args) => {
  const applyValidator = compose(ensurePromise, apply(validator));

  return compose(
    andThen(
      ifElse(
        identity,
        compose(mapValidResult, apply(originalHandler), always(args)),
        mapInvalidResult,
      ),
    ),
    applyValidator,
  )(args);
});

const withStatus = useWith(updateHandler, [fnTransformation, identity]);

export default withStatus;
