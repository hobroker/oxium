import { injectEvents } from '../src/events';

describe('injectEvents', () => {
  const createModule = on => ({
    debug: {
      extend() {
        return () => {};
      },
    },
    app: {
      emitter: { on },
    },
  });

  it('should inject events into a module', () => {
    const store = {};
    const emitterOn = jest.fn((key, fn) => {
      store[key] = fn;
    });
    const events = {
      TEST: () => 'lol',
    };
    const eventsCount = Object.keys(events).length;
    const module = createModule(emitterOn);

    injectEvents(module, events);

    expect(emitterOn).toHaveBeenCalledTimes(eventsCount);

    expect(typeof store.TEST).toBe('function');
    expect(store.TEST()).toBe('lol');
  });

  it('should not inject any events if none are provided', () => {
    const emitterOn = jest.fn();
    const module = createModule(emitterOn);

    injectEvents(module);

    expect(emitterOn).toHaveBeenCalledTimes(0);
  });
});
