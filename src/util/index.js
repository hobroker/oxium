import * as _ from 'lodash/fp';

/**
 * @param {Function} fn
 * @param {Array} array
 * @returns {Promise<*>}
 */
const resolveSequentially = _.curry((fn, array) =>
  _.reduce((p, item) => p.then(() => fn(item)), Promise.resolve(), array),
);

const mapTo = _.curry((map, object) => {
  const defaultValue = Array.isArray(map) ? [] : {};
  const computeResult = value => {
    switch (true) {
      case _.isFunction(value):
        return value(object);
      case _.isObject(value):
        return mapTo(value, object);
      case _.isString(value):
        return _.prop(value, object);
      case _.isArray(value):
        return _.pick(value, object);
      default:
        return value;
    }
  };

  return _.entries(map).reduce((acc, [key, value]) => {
    acc[key] = computeResult(value);

    return acc;
  }, defaultValue);
});

const wait = ms => new Promise(r => setTimeout(r, ms));

const assignOnce = _.curry((key, value, target) => {
  Object.defineProperty(target, key, {
    writable: false,
    configurable: false,
    value,
  });

  return target;
});

const call = fn => fn();

export { assignOnce, call, mapTo, resolveSequentially, wait };
export * from './decorators';
