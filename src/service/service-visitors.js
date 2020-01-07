import * as _ from 'lodash/fp';

const servicesVisitor = ({ services }) =>
  _.reduce(
    (acc, [key, service]) => {
      acc[key] = service;
      service.displayName = key;

      return acc;
    },
    {},
    _.entries(services),
  );

export { servicesVisitor };
