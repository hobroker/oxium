import * as _ from 'lodash/fp';
import * as yup from 'yup';

const dependenciesVisitor = ({ id, dependencies }, { modules }) => {
  const missingDependencies = _.compose(
    _.difference(dependencies),
    _.map('id'),
  )(modules);

  if (missingDependencies.length) {
    throw new Error(`module ${id} depends on: ${missingDependencies}`);
  }
};

const configVisitor = ({ id, configValidationSchema }, { app }) => {
  if (!configValidationSchema) {
    return {};
  }

  const config = app.config?.modules?.[id];
  const validationSchema = yup.object().shape(configValidationSchema);

  return validationSchema.validateSync(config) || {};
};

export { configVisitor, dependenciesVisitor };
