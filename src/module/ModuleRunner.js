import * as _ from 'lodash/fp';
import { applyVisitors } from './visitors';
import { injectEvents } from '../events';
import { call, resolveSequentially } from '../utils';
import { WEB } from '../constants';
import { injectServices } from '../service';

class ModuleRunner {
  static STEPS = [];

  constructor(app) {
    this.app = app;
  }

  registerModules(modules) {
    const appMark = this.app.constructor.mark;

    this.modules = _.filter(({ mark }) => !mark || mark === appMark, modules);

    return this;
  }

  async loadModules() {
    const { app, modules } = this;

    await applyVisitors({ modules, app }, modules);

    const mappedModules = modules.reduce(
      (acc, Module) => ({
        ...acc,
        [Module.id]: new Module(this.app),
      }),
      {},
    );

    this.mappedModules = mappedModules;

    return mappedModules;
  }

  run() {
    return resolveSequentially(call, [
      ::this._runOnBeforeStartModules,
      ::this._runOnStartModules,
      ::this._runOnAfterStartModules,
    ]);
  }

  stopped = false;

  async stop() {
    if (this.stopped) {
      return;
    }

    this.stopped = true;

    await this._runOnStopModules();
  }

  async _runOnBeforeStartModules() {
    const { mappedModules } = this;

    _.forEach(instance => {
      const { events } = instance.constructor;

      if (instance.app.constructor.mark === WEB) {
        injectEvents(instance, events);
      }
    }, mappedModules);

    await resolveSequentially(injectServices, mappedModules);

    await this._runVisitor(module => module.onBeforeStart());

    return mappedModules;
  }

  _runOnStartModules() {
    return this._runVisitor(module => module.onStart());
  }

  _runOnAfterStartModules() {
    return this._runVisitor(module => module.onAfterStart());
  }

  _runOnStopModules() {
    return this._runVisitor(module => module.onStop());
  }

  _runVisitor(fn) {
    return resolveSequentially(fn, this.mappedModules);
  }
}

export default ModuleRunner;
