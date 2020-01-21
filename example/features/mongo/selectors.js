import { compose, lensProp, view } from 'ramda';
import { configFeaturesLens } from '../../lib/selectors/config';
import { MONGO } from '.';

export const mongoLens = lensProp(MONGO);
export const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);

export const getMongoConfig = view(configFeaturesMongoLens);

export const getMongo = view(mongoLens);
