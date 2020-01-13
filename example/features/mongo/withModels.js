import { Schema } from 'mongoose';
import { curry, forEach } from 'ramda';
import { assocWith } from '../../lib/feature';
import { getAppFeatureById } from '../../lib/selectors/params';

const withModels = assocWith('models');

const schemaOptions = { timestamps: true };

const loadModel = Model => {
  const { name } = Model;
  const schema = new Schema(Model.SCHEMA, schemaOptions);

  const meta = { Model, schema, name };

  return meta;
};

const loadModels = forEach(loadModel);

const withModelsEvaluator = curry((models, params) => {
  const mongoFeature = getAppFeatureById(params);

  // mongoFeature.handler = null;

  // models = values(models);
  // loadModels(models);
  // console.log('params.app.features', params.app.features);
});

export { withModels, withModelsEvaluator };
