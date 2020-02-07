import {
  always,
  apply,
  compose,
  curry,
  equals,
  identity,
  unless,
  useWith,
} from 'ramda';
import { updateHandler } from '../lens/feature';
import pipeAsync from '../util/pipeAsync';
import { HANDLER_NOT_READY_RESULT } from '../constants';

const fnTransformation = curry((validator, originalHandler) => (...args) => {
  const callOriginalHandler = compose(apply(originalHandler), always(args));

  return pipeAsync(
    apply(validator),
    unless(equals(HANDLER_NOT_READY_RESULT), callOriginalHandler),
  )(args);
});

const withStatus = useWith(updateHandler, [fnTransformation, identity]);

export default withStatus;
