import mongoose from 'mongoose';
import { converge } from 'ramda';
import { createDebug } from '../../../src/util/debug';
import { getMongoConfig } from './lens';
import { MONGO, MONGOOSE_CONNECT_OPTIONS } from './constants';
import { getPreparedModels, loadModels } from './util';

const debug = createDebug(MONGO);

const handler = converge(
  async (config, models) => {
    const { connectionString } = config;

    debug('connecting to %s', connectionString);

    const mongo = await mongoose.connect(
      connectionString,
      MONGOOSE_CONNECT_OPTIONS,
    );

    loadModels(mongo, models);

    debug('connected');

    return mongo;
  },
  [getMongoConfig, getPreparedModels],
);

const Mongo = {
  id: MONGO,
  handler,
};

export AbstractModel from './AbstractModel';

export default Mongo;
