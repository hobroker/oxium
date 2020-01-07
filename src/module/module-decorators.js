import { assignOnce } from '../utils';

const markAs = assignOnce('mark');

const withId = assignOnce('id');

const withVisitors = assignOnce('visitors');

const withEvents = assignOnce('events');

const withServices = assignOnce('services');

const withConfig = assignOnce('configValidationSchema');

const requireModules = assignOnce('dependencies');

export {
  withConfig,
  markAs,
  requireModules,
  withEvents,
  withId,
  withServices,
  withVisitors,
};
