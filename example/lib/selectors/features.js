import { isFeatureLoaded } from './feature';

export const areAllFeaturesLoaded = features => features.every(isFeatureLoaded);
