import { lensProp, set, view } from 'ramda';

const featuresLens = lensProp('features');

const getFeatures = view(featuresLens);

const setFeatures = set(featuresLens);

export { featuresLens };

export { getFeatures, setFeatures };
