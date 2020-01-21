import { compose, lensProp, view } from 'ramda';

export const configLens = lensProp('config');
export const featuresLens = lensProp('features');
export const configFeaturesLens = compose(configLens, featuresLens);

export const getConfig = view(configLens);
export const getConfigFeatures = view(configFeaturesLens);
