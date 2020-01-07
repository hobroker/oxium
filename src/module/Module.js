class Module {
  /**
   * @param {App} app
   */
  constructor(app) {
    this.app = app;
    const { id } = this.constructor;
    this.debug = app.debug.extend(id);
  }

  async onRegister() {
    //
  }

  async onBeforeStart() {
    //
  }

  async onStart() {
    //
  }

  async onAfterStart() {
    //
  }

  async onStop() {
    //
  }

  get modules() {
    return this.app.modules;
  }

  get emitter() {
    return this.app.emitter;
  }
}

export default Module;
