import { compose, lensProp, view } from 'ramda';
import { FEATURES, META, RESULT } from '../constants';

export const featuresLens = lensProp(FEATURES);
export const metaLens = lensProp(META);
export const resultLens = lensProp(RESULT);

export const getMetaResult = view(compose(metaLens, resultLens));
