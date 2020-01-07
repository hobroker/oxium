import * as _ from 'lodash/fp';
import NanoEvents from 'nanoevents';

const injectEvents = (module, events) => {
  const debug = module.debug.extend('events');

  _.entries(events).forEach(([key, fn]) => {
    debug('listening for', key);
    const handler = module::fn;

    module.app.emitter.on(key, (...args) => {
      debug('emitted', key);

      return handler(...args);
    });
  });
};

export { NanoEvents, injectEvents };
