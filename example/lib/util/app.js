import { call, compose, converge, curry, filter, includes, map } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { getHandler, getProps } from '../selectors/feature';
import { getAllFeatureIds } from './params';
import { lazy } from '.';

export const filterFeaturesByHandler = filter(compose(isFunction, getHandler));

export const loadFeature = converge(lazy(call), [getHandler, getProps]);

export const loadFeatures = compose(map(loadFeature), filterFeaturesByHandler);

export const hasFeature = curry((key, params) =>
  compose(includes(key), getAllFeatureIds)(params),
);
