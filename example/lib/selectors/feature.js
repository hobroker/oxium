import { prop, propOr } from 'ramda';

export const getFeatureId = prop('id');

// app
export const getHandler = prop('handler');

export const getProps = propOr({}, 'props');
