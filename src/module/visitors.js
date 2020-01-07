import * as _ from 'lodash/fp';
import { servicesVisitor } from '../service';
import { resolveSequentially } from '../utils';
import { configVisitor, dependenciesVisitor } from './module-visitors';

const defaultVisitors = [
  { fn: dependenciesVisitor },
  { fn: configVisitor, as: 'config' },
  { fn: servicesVisitor, as: 'services' },
];

const pickVisitors = _.reduce(
  (acc, module) => [...acc, ...(module.visitors || [])],
  [],
);

const walkModule = _.curry(async (params, module, visitor) => {
  const { id } = module;
  const { fn, as, once, noMore, only } = visitor;

  // if the visitor doesn't need to run anymore
  if (once && noMore) {
    return;
  }

  // if the visitor should run for specific modules
  if (Array.isArray(only) && !_.includes(id, only)) {
    return;
  }

  // run visitor
  const result = await fn(module, params);

  // if should save result to module prototype
  if (as) {
    module.prototype[as] = result;
  }

  // if shouldn't run this visitor again
  if (once) {
    visitor.noMore = true;
  }
});

const applyVisitors = _.curry(async (params, modules) => {
  // merge all visitors
  const localVisitors = pickVisitors(modules).concat(defaultVisitors);

  return resolveSequentially(
    module => resolveSequentially(walkModule(params, module), localVisitors),
    modules,
  );
});

export { walkModule, pickVisitors };
export { applyVisitors };
