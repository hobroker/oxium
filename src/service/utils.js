import * as _ from 'lodash/fp';
import { resolveSequentially } from '../util';

const injectServices = async module => {
  const { services } = module;

  return resolveSequentially(async ([key, Service]) => {
    const service = new Service(module);
    await service.onRegister();
    module.services[key] = service;
    service.debug('service registered');
  }, _.entries(services));
};

export { injectServices };
