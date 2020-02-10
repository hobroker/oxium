import { apply, curry, equals, ifElse } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import pipeAsync from '../util/pipeAsync';
import { debugItRuntime } from '../util/debug';
import invariant from '../util/invariant';
import { getHandler, getId, setHandler } from '../lens/feature';
import { HANDLER, HANDLER_NOT_READY_RESULT } from '../constants';

const wrapHandler = curry((validator, whenPassed, whenFailed) => (...args) =>
  pipeAsync(
    apply(validator),
    ifElse(
      equals(HANDLER_NOT_READY_RESULT),
      whenFailed(args),
      whenPassed(args),
    ),
  )(args),
);

const deferHandler = curry((validator, feature) => {
  const originalHandler = getHandler(feature);
  invariant(
    isFunction(originalHandler),
    `deferHandler: %s feature.handler must be a function"`,
    getId(feature),
    HANDLER,
  );

  const whenFailed = () => () => debugItRuntime('defered', getId(feature));
  const whenPassed = args => () => originalHandler(...args);
  const newHandler = wrapHandler(validator, whenPassed, whenFailed);

  return setHandler(newHandler, feature);
});

export default deferHandler;
