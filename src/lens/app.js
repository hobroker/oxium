import { lensProp, set, view } from 'ramda';
import { FEATURES } from '../constants';

const featuresLens = lensProp(FEATURES);

const getFeatures = view(featuresLens);

const setFeatures = set(featuresLens);

export { featuresLens };

export { getFeatures, setFeatures };
