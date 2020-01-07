import debug from 'debug';
import { markAs, ModuleRunner } from './module';
import { WEB } from './constants';
import { NanoEvents } from './events';

@markAs(WEB)
class App {
  debug = debug('app');

  emitter = new NanoEvents();

  /**
   * @param {{}} config
   */
  constructor({ config = {} } = {}) {
    this.config = config;

    this.stop = ::this.stop;
    this.onError = ::this.onError;
  }

  async _run(modules) {
    this.moduleRunner = new ModuleRunner(this);

    this.moduleRunner.registerModules(modules);
    await this.moduleRunner.loadModules();

    await this.moduleRunner.run();
  }

  async run(modules) {
    try {
      await this._run(modules);
      process.once('SIGINT', this.stop);
      process.once('beforeExit', this.stop);
    } catch (error) {
      this.onError(error);
    }
  }

  async stop() {
    if (!this.moduleRunner) {
      return;
    }

    await this.moduleRunner.stop();

    this.moduleRunner = null;
  }

  onError(error) {
    if (error.name === 'ValidationError') {
      this.debug(error.errors);
    } else {
      this.debug(error);
    }

    process.exit(1);
  }

  has(key) {
    return typeof this.moduleRunner.modules[key] !== 'undefined';
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    }

    return this.moduleRunner.modules[key];
  }

  get modules() {
    return this.moduleRunner.mappedModules;
  }
}

export default App;
