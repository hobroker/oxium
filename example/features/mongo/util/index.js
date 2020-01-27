import {
  applySpec,
  compose,
  curry,
  defaultTo,
  flatten,
  forEach,
  identity,
  map,
  prop,
} from 'ramda';
import { Schema } from 'mongoose';
import { getFeatures } from '../../../../src/lens/app';
import { MONGOOSE_SCHEMA_OPTIONS } from '../constants';
import { getSchema, getSharedModels } from '../lens';

const createSchema = (value, options = MONGOOSE_SCHEMA_OPTIONS) =>
  new Schema(value, options);

const getModelMeta = applySpec({
  Model: identity,
  name: prop('name'),
  schema: compose(createSchema, getSchema),
});

export const getPreparedModels = compose(
  flatten,
  map(compose(map(getModelMeta), defaultTo([]), getSharedModels)),
  getFeatures,
);

export const loadModels = curry((mongo, models) =>
  forEach(({ Model, schema, name }) => {
    mongo.model(Model, schema, name);
  }, models),
);
