import { compose, curry, defaultTo, flatten, map } from 'ramda';
import { Schema } from 'mongoose';
import { getFeatures } from '../../../../src/lens/app';
import { MONGOOSE_SCHEMA_OPTIONS } from '../constants';
import { getSchema, getSharedModels } from '../lens';
import { debugMongo } from '..';

const createSchema = value => new Schema(value, MONGOOSE_SCHEMA_OPTIONS);

const createSchemaFromModel = compose(createSchema, getSchema);

export const collectModels = compose(
  flatten,
  map(compose(defaultTo([]), getSharedModels)),
  getFeatures,
);

export const loadModels = curry((mongo, models) =>
  map(Model => {
    const schema = createSchemaFromModel(Model);
    debugMongo('load model', Model.name);

    return mongo.model(Model, schema);
  }, models),
);
