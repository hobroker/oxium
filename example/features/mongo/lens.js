import {
  assoc,
  compose,
  identity,
  lens,
  lensProp,
  prop,
  set,
  useWith,
  values,
  view,
} from 'ramda';
import { configFeaturesLens } from '../../../src/lens/config';
import {
  featureByIdIsLoadedLens,
  featureByIdLens,
} from '../../../src/lens/app';
import { MONGO } from './constants';
import { metaLens } from '../../../src/lens/feature';
import { assign } from '../../../src/util';

export const modelsLens = lens(
  prop('models'),
  useWith(assoc('models'), [values, identity]),
);
export const shemaLens = lens(prop('SCHEMA'), assign('SCHEMA'));
export const mongoLens = lensProp(MONGO);
export const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);
export const featuresMongoLens = featureByIdLens(MONGO);
export const isMongoLoadedLens = featureByIdIsLoadedLens(MONGO);
export const metaModelsLens = compose(metaLens, modelsLens);

export const getMongoConfig = view(configFeaturesMongoLens);

export const getMongo = view(featuresMongoLens);

export const isMongoLoaded = view(isMongoLoadedLens);

export const shareMongoModels = set(metaModelsLens);
export const getSharedModels = view(metaModelsLens);

export const setSchema = set(shemaLens);
export const getSchema = view(shemaLens);
