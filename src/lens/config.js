import { compose, lensProp } from 'ramda';

export const configLens = lensProp('config');
export const featuresLens = lensProp('features');
export const configFeaturesLens = compose(configLens, featuresLens);
