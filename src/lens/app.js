import { lensProp, set, view } from 'ramda';
import { FEATURES } from '../constants';

export const featuresLens = lensProp(FEATURES);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);
