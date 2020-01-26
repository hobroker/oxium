import { applySpec, compose, identity, prop } from 'ramda';
import { Schema } from 'mongoose';

const schemaOptions = {
  timestamps: true,
};

export const createSchema = value => new Schema(value, schemaOptions);

export const getModelMeta = applySpec({
  Model: identity,
  name: prop('name'),
  schema: compose(createSchema, prop('schema')),
});
