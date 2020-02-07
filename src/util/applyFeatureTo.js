import { always, compose, cond, curry, equals, T } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { getHandler, setFeatureIsLoaded } from '../lens/feature';
import { ensurePromise } from './async';
import pipeAsync from './pipeAsync';
import { HANDLER_NOT_READY_RESULT } from '../constants';

const mapRightResult = setFeatureIsLoaded(true);

const resolveHandler = curry((app, handler) => ensurePromise(handler(app)));

const callFeatureWith = curry((app, feature) =>
  compose(resolveHandler(app), getHandler)(feature),
);

const applyFeatureTo = curry((app, feature) =>
  pipeAsync(
    callFeatureWith,
    cond([
      [equals(HANDLER_NOT_READY_RESULT), always(feature)],
      [isFunction, result => pipeAsync(mapRightResult, result)(feature)],
      [T, compose(mapRightResult, always(feature))],
    ]),
  )(app, feature),
);

export default applyFeatureTo;
