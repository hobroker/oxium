import {
  allPass,
  always,
  apply,
  compose,
  converge,
  filter,
  juxt,
  map,
} from 'ramda';
import { isFunction, isNotNull, isNotUndefined } from 'ramda-adjunct';
import { getHandler, getProps } from '../selectors/feature';

export const filterFeaturesByHandler = filter(compose(isFunction, getHandler));

export const getHandlerArgs = juxt([getProps]);

export const loadFeature = converge(compose(always, apply), [
  getHandler,
  getHandlerArgs,
]);

export const loadFeatures = compose(map(loadFeature), filterFeaturesByHandler);

export const shouldAddToProps = allPass([isNotUndefined, isNotNull]);
