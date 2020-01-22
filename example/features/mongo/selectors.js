import { compose, lensProp, view } from 'ramda';
import { configFeaturesLens } from '../../lib/selectors/config';
import {
  featureByIdLens,
  featureMetaIsLoadedLens,
} from '../../lib/selectors/app';
import { MONGO } from '.';

export const mongoLens = lensProp(MONGO);
export const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);
export const featuresMongoLens = featureByIdLens(MONGO);
export const isMongoLoadedLens = featureMetaIsLoadedLens(MONGO);

export const getMongoConfig = view(configFeaturesMongoLens);

export const getMongo = view(featuresMongoLens);

export const isMongoLoaded = view(isMongoLoadedLens);
