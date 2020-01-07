class AbstractModuleConnector {
  constructor(module = throw new Error('module is required')) {
    this.module = module;

    const { displayName, name } = this.constructor;
    this.debug = module.debug.extend(displayName || name);
  }

  async onRegister() {
    //
  }

  get models() {
    return this.module.models;
  }

  get services() {
    return this.module.services;
  }

  get config() {
    return this.module.config;
  }
}

export default AbstractModuleConnector;
