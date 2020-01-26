import { compose, lensProp, view } from 'ramda';
import { configFeaturesLens } from '../../../src/lens/config';
import {
  featureByIdLens,
  featureByIdIsLoadedLens,
} from '../../../src/lens/app';
import { MONGO } from './constants';

export const mongoLens = lensProp(MONGO);
export const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);
export const featuresMongoLens = featureByIdLens(MONGO);
export const isMongoLoadedLens = featureByIdIsLoadedLens(MONGO);

export const getMongoConfig = view(configFeaturesMongoLens);

export const getMongo = view(featuresMongoLens);

export const isMongoLoaded = view(isMongoLoadedLens);

export const shareMongoModels = 1;
